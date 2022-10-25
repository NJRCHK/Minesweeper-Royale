import ServerSideBoard from './ServerSideBoard.js';
import { Point, TileValue } from '../../shared/types.js';

export default class Player {
    board: ServerSideBoard;
    id: number;
    alive: boolean;
    username: string;

    constructor (username: string, id: number, seed: number) {
        this.board = new ServerSideBoard(40, 40, 10, seed);
        this.id = id;
        this.alive = true;
        this.username = username;
    }

    clientifyData() {
        let clonedPlayer = JSON.parse(JSON.stringify(this));
        delete clonedPlayer.board.board;
        delete clonedPlayer.board.seed;
        delete clonedPlayer.board.squaresRemaining;
        return clonedPlayer;
    }

    revealTile(point: Point) {
        if(!this.alive){
            return;
        }
        let revealedValues = this.board.revealTiles(point);
        revealedValues.forEach(value => {
            if(value === TileValue.BOMB){
                this.alive = false;
            }
        });
    }
}
