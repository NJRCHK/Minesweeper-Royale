import Player from './Player.js';
import { Point } from '../../shared/types.js';

export default class Game {
    players: Player[];
    seed: number;
    inProgress: boolean;
    constructor() {
        this.players = [];
        this.seed = this.generateSeed();
        this.inProgress = true;
    }

    getPlayers() {
        return this.players;
    }

    getPlayerWithId(id: number): Player {
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].id === id){
                return this.players[i];
            }
        }
        throw `Player does not exist with id ${id}`;
    }

    addPlayer(id: number) {
        let newPlayer = new Player(id, this.seed);
        this.players.push(newPlayer);
    }

    handlePlayerClick(id: number, clickedTile: Point) {
        if(!this.inProgress){
            return;
        }
        const player = this.getPlayerWithId(id);
        player.revealTile(clickedTile);
        if(player.board.minesRemaining === 0){
            this.inProgress = false;
        }
    }

    clientifyPlayers() {
        let clonedPlayers = JSON.parse(JSON.stringify(this.players));
        console.log(clonedPlayers);
        for(let i = 0; i < clonedPlayers.length; i++){
            let board = clonedPlayers[i].board;
            delete board.seed;
            delete board.squaresRemaining;
            delete board.board;
        }
        return clonedPlayers;
    }

    removePlayer(id: number){
        this.players = this.players.filter(player => player.id !== id);
    }

    generateSeed(): number {
        let randomNumber = Math.random();
        randomNumber = randomNumber* Math.pow(10, 8);
        randomNumber = Math.trunc(randomNumber); 
        return randomNumber;
    }
}