import {WebSocket, WebSocketServer, RawData} from 'ws';
import Game from './Game';


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
            this.handleNewConnection(id);
            ws.on('message', data => {
                this.handleMessage(id, data);
            });
            ws.on('close', () => {
                this.handleDisconnection(id);
            });
        });
    }

    handleMessage(id: number, data: RawData) {
        let parsedData;
        try {
            parsedData = JSON.parse(data.toString());
        } catch {
            console.log(`Recieved message that was not parsable to JSON from client ${id}. Message: ${data.toString()}`);
            return;
        }
        console.log(parsedData);
    }

    handleNewConnection(id: number) {
        this.game.addPlayer(id);
    }

    handleDisconnection(id: number){
        this.game.removePlayer(id);
    }

    generateId(): number{
        return Math.floor(Math.random() * (100000000));
    }
}