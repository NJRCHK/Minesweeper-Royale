import {WebSocket, WebSocketServer, RawData, Data} from 'ws';
import {Point, ServerMessage} from '../../shared/types.js';
import Game from './Game.js';


interface ClientMessage {
    route: String,
    data: Object;
}

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

        switch(String(parsedData.route)){
            case 'chat':
                this.handleChatMessage(id, parsedData.data);
                break;
            case 'click':
                this.handleClick(id, ws, parsedData.data);
                break;
        }
    }

    handleNewConnection(id: number, ws: WebSocket) {
        this.game.addPlayer(id);
        const response = JSON.stringify({
            "route": "newconnection",
            "data": {
                "id": id,
                "gamestate": this.game.inProgress,
                "players": this.game.clientifyPlayers(),  
            }
        } as ServerMessage);
        ws.send(JSON.stringify(response));
    }

    handleChatMessage(id: number, message: any) {
        if(!('message' in message)){
            console.log(`Recieved message in improper format.  Message: ${JSON.stringify(message)}`);
            return;
        }
        let messageString = JSON.stringify({
            route: "chat",
            data: {
                message: message.message,
                username: id
            }
        });
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
            "route": "updateplayer",
            "data": {
                "player": this.game.getPlayerWithId(id).clientifyData(),
                "gamestate": this.game.inProgress
            }
        } as ServerMessage);
        ws.send(response);
        const leaderboard = JSON.stringify({
            "route": "leaderboard",
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