import ServerSideBoard from './ServerSideBoard.js';
import { Point } from '../../shared/types.js';

export default class Player {
    board: ServerSideBoard;
    id: Number;
    alive: boolean;

    constructor (id: number, seed: number) {
        this.board = new ServerSideBoard(40, 40, 10, seed);
        this.id = id;
        this.alive = true;
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
            if(value === -1){
                this.alive = false;
            }
        });
    }
}