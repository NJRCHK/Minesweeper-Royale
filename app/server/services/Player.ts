import ServerSideBoard from './ServerSideBoard.js';
import { GameDifficulty, Point, TileValue } from '../../shared/types.js';
import { BEGINNERCONFIG, INTERMEDIATECONFIG, EXPERTCONFIG } from '../../shared/constants.js';

export default class Player {
    board: ServerSideBoard;
    id: number;
    alive: boolean;
    username: string;

    constructor (username: string, id: number, seed: number, difficulty: GameDifficulty) {
        let config = this.getConfig(difficulty);
        this.board = new ServerSideBoard(config.height,config.width, config.mines, seed);
        this.id = id;
        this.alive = true;
        this.username = username;
    }

    getConfig(difficulty: GameDifficulty) {
        switch(difficulty){
            case GameDifficulty.BEGINNER:
                return BEGINNERCONFIG;
            case GameDifficulty.INTERMEDIATE:
                return INTERMEDIATECONFIG;
            case GameDifficulty.EXPERT:
                return EXPERTCONFIG;
        }
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
