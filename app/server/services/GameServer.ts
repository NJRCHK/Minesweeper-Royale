import {WebSocket, WebSocketServer, RawData, Data, Server} from 'ws';
import {ClientToServerRoutes, ClientMessage, Point, ServerMessage, ServerToClientRoutes } from '../../shared/types.js';
import Game from './Game.js';

export default class GameServer {
    server: WebSocketServer;
    game: Game;

    constructor() {
        this.server = new WebSocketServer({port: 8080});
        this.game = new Game();
        this.startServer();
    }

    startServer() {
        this.server.on('connection', ws => {
            const id = this.generateId();
            this.handleNewConnection(id, ws);
            ws.on('message', data => {
                this.handleMessage(id,ws, data);
            });
            ws.on('close', () => {
                this.handleDisconnection(id);
            });
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
        }
    }

    handleNewConnection(id: number, ws: WebSocket) {
        this.game.addPlayer(id);
        const response = JSON.stringify({
            "route": ServerToClientRoutes.NEWCONNECTION,
            data: {
                id: id,
                gamestate: this.game.inProgress,
                leaderboard: this.game.getLeaderboard(),
                player: this.game.getPlayerWithId(id),
            }
        } as ServerMessage);

        ws.send(response);
    }

    handleChatMessage(id: number, message: any) {
        if(!('message' in message)){
            console.log(`Recieved message in improper format.  Message: ${JSON.stringify(message)}`);
            return;
        }
        let messageString = JSON.stringify({
            route: ServerToClientRoutes.CHAT,
            data: {
                message: message.message,
                username: id
            }
        } as ServerMessage);
        this.server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(messageString);
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
        const response = JSON.stringify({
            route: ServerToClientRoutes.UPDATEPLAYER,
            data: {
                "player": this.game.getPlayerWithId(id).clientifyData(),
                "gamestate": this.game.inProgress
            }
        } as ServerMessage);
        ws.send(response);
        const leaderboard = JSON.stringify({
            route: ServerToClientRoutes.LEADERBOARD,
            data: this.game.getLeaderboard()
        } as ServerMessage);
        this.server.clients.forEach(client => {
            client.send(leaderboard);
        });
    }

    handleDisconnection(id: number){
        this.game.removePlayer(id);
    }

    generateId(): number{
        return Math.floor(Math.random() * (100000000));
    }
}