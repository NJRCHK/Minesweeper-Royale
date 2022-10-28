import {WebSocket, WebSocketServer, RawData, Server} from 'ws';
import * as util from 'util';
import Game from './Game.js';
import cookieParser from 'cookie-parser';
import { TIME_BETWEEN_GAMES_MS } from '../../shared/constants.js';
import { MySQLStore } from 'express-mysql-session';
import {
        ClientToServerRoutes, 
        ChatMessage, 
        ClientMessage, 
        Point, 
        ServerMessage, 
        ServerToClientRoutes, 
        LeaderboardMessage, 
        UpdatePlayerMessageData, 
        FirstConnectionMessageData,
        NewGameMessageData,
    } from '../../shared/types.js';

export default class GameServer {
    server: WebSocketServer;
    game: Game;
    sessionStore: MySQLStore;

    constructor(sessionStore: MySQLStore) {
        this.server = new WebSocketServer({port: 8080});
        this.game = new Game();
        this.sessionStore = sessionStore;
        this.startServer();

    }

    startServer() {
        this.server.on('connection', ws => {
            const id = this.generateId();
            ws.on('message', data => {
                this.handleMessage(id,ws, data);
            });
            ws.on('close', () => {
                this.handleDisconnection(id);
            });
        });
    }

    createNewGame(){
        const newGame = new Game(this.game.players);
        this.game = newGame;
        if(this.game.players.length === 0){
            return;
        }
        const player = this.game.players[0];
        const message = {
            route: ServerToClientRoutes.NEWGAME,
            data: {
                leaderboard: this.game.getLeaderboard(),
                gamestate: true,
                board: player.clientifyData().board
            } as NewGameMessageData
        } as ServerMessage;

        this.server.clients.forEach(client => {
            client.send(JSON.stringify(message));
        });
    }
    
    validateMessage(data: RawData): ClientMessage {
        let parsedData = JSON.parse(data.toString());
        if(!parsedData.hasOwnProperty('route')){
            throw (`Recieved message that was not parsable to JSON from client. Message: ${data.toString()}`);
        }
        if(!parsedData.hasOwnProperty('data')){
            throw (`Recieved message that was not parsable to JSON from client. Message: ${data.toString()}`);
        }

        if(Object.keys(parsedData).length !== 2){
            throw (`Unexpected data recieved. Data should only contain properties 'data' and 'route'. Instead, data looked like : ${data}`);
        }
        
        return parsedData as ClientMessage;
    }
    
    async verifyClient(_id: number, _ws: WebSocket, message: any): Promise<string> {
        let cookie = message.cookie;
        cookie = decodeURIComponent(cookie);
        if(process.env.SESSIONSTORE_SECRET === undefined){
            throw `Environment variables not configured correctly`;
        }
        cookie = cookie.replace("connect.sid=","");
        let signedCookie = cookieParser.signedCookie(cookie, process.env.SESSIONSTORE_SECRET);
        if(signedCookie === false){
            return "";
        }
        return new Promise((resolve, _reject) => {
            this.sessionStore.get(signedCookie as string, (err, sess) => {
                if(err){
                    resolve("");
                } else if (sess === null || sess.user === null){
                    resolve("");
                }
                else if (sess.user.loggedIn === true){
                    resolve(sess.user.username);
                } else {
                    resolve("");
                }
            });
        });
    }

    handleMessage(id: number, ws: WebSocket, data: RawData) {
        let parsedData: ClientMessage;
        try {
            parsedData = this.validateMessage(data);

        } catch (e) {
            console.log(e);
            return;
        }

        switch(parsedData.route){
            case ClientToServerRoutes.CHAT:
                this.handleChatMessage(id, parsedData.data);
                break;
            case ClientToServerRoutes.CLICK:
                this.handleClick(id, ws, parsedData.data);
                break;
            case ClientToServerRoutes.CONNECT:
                this.handleNewConnection(id, ws, parsedData.data);
                break;
        }
    }

    async handleNewConnection(id: number, ws: WebSocket, data: any) {
        let result = await this.verifyClient(id, ws, data);
        if(result !== ""){
            this.game.addPlayer(id, result);
        } 
        else {
            this.game.addPlayer(id);
        }
        const response = JSON.stringify({
            route: ServerToClientRoutes.NEWCONNECTION,
            data: {
                id: id,
                gamestate: this.game.inProgress,
                leaderboard: this.game.getLeaderboard(),
                player: this.game.getPlayerWithId(id),
            } as FirstConnectionMessageData
        } as ServerMessage);

        ws.send(response);
    }

    handleChatMessage(id: number, message: any) {
        if(!('message' in message)){
            console.log(`Recieved message in improper format.  Message: ${JSON.stringify(message)}`);
            return;
        }
        let messageString = {
            route: ServerToClientRoutes.CHAT,
            data: {
                username: this.game.getPlayerWithId(id).username,
                message: String(message.message),
            } as ChatMessage
        } as ServerMessage;
        this.server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(messageString));
            }
        });
    }

    validateClickMessage(data: Object): Point {
        if(Object.keys(data).length !== 2){
            throw `Unexpected data recieved. data should be in form x: number y: number`;
        }

        if(!data.hasOwnProperty('x')){
            throw `Unexpected data recieved. data missing x coordinate`;
        }

        if(!data.hasOwnProperty('y')){
            throw `Unexpected data recieved. data missing x coordinate`;
        }
        return data as Point;
    }

    handleClick(id: number, ws: WebSocket, data: Object){
        let validatedData: Point;
        try {
            validatedData = this.validateClickMessage(data);
        } catch (e) {
            console.log(e);
            return;
        }
        
        this.game.handlePlayerClick(id, validatedData);
        
        const response = {
            route: ServerToClientRoutes.UPDATEPLAYER,
            data: {
                player: this.game.getPlayerWithId(id).clientifyData(),
                gamestate: this.game.inProgress
            } as UpdatePlayerMessageData
        } as ServerMessage;

        ws.send(JSON.stringify(response));
        
        const leaderboard = {
            route: ServerToClientRoutes.LEADERBOARD,
            data: {
                leaderboard: this.game.getLeaderboard(),
                gamestate: this.game.inProgress
            } as LeaderboardMessage
        } as ServerMessage;
        this.server.clients.forEach(client => {
            client.send(JSON.stringify(leaderboard));
        });

        if(!this.game.inProgress){
            setTimeout(() => {
                this.createNewGame();
            }, TIME_BETWEEN_GAMES_MS);
        }
    }

    handleDisconnection(id: number){
        this.game.removePlayer(id);
    }

    generateId(): number{
        return Math.floor(Math.random() * (100000000));
    }
}
