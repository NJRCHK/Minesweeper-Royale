import Player from './Player.js';
import Board from '../../shared/Board.js';

export default class Game {
    players: Player[];
    board: Board;
    constructor() {
        this.players = [];
        this.board = new Board(40, 40, 10);
    }

    addPlayer(id: number) {
        console.log(`${id} Connected`);
    }

    removePlayer(id: number){
        console.log(`${id} Disconnected`);
    }
}