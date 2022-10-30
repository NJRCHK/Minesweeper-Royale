import ServerSideBoard from './ServerSideBoard.js';
import { Config, GameDifficulty, Point, TileValue } from '../../shared/types.js';
import { BEGINNERCONFIG, INTERMEDIATECONFIG, EXPERTCONFIG } from '../../shared/constants.js';

export default class Player {
    board: ServerSideBoard;
    id: number;
    alive: boolean;
    username: string;
    config: Config;
    seed: number;

    constructor (username: string, id: number, seed: number, difficulty: GameDifficulty) {
        this.config = this.getConfig(difficulty);
        this.board = new ServerSideBoard(this.config.height,this.config.width, this.config.mines, seed);
        this.id = id;
        this.alive = true;
        this.username = username;
        this.seed = seed;
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

    resetPlayer() {
        this.board = new ServerSideBoard(this.config.height,this.config.width, this.config.mines, this.seed);
        console.log(this.board.squaresRemaining);
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
            if(value === TileValue.BOMB){
                this.alive = false;
            }
        });
    }
}
