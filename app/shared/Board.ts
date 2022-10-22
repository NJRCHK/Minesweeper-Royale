import seedrandom from 'seedrandom';
import { Point, Tile } from '../shared/types';

export default class Board{

    height: number;
    width: number;
    mines: number;
    seed: number;

    constructor(height: number, width: number, mines: number , seed?: number){
        this.height = height;
        this.width = width;
        this.mines = mines;
        this.seed = (seed === undefined) ? Board.generateSeed() : seed;
    }

    get area(): number {
        return this.width * this.height;
    }

    isVisited(x: number, y: number, visited: Point[]): boolean {
        for(let i = 0; i < visited.length; i++){
            if(visited[i].x === x && visited[i].y === y){
                return true;
            }
        }
        return false;
    }

    getCoordinatesToReveal(x: number, y: number, board: number[][], visited: Point[] = []): Tile[] {        
        let tilesToReveal = new Array<Tile>;

        if((x<0 || x>=this.height) || (y<0 || y>=this.width)){
            return tilesToReveal;
        }

        if(this.isVisited(x,y,visited)){
            return tilesToReveal;
        }
        visited.push({
            x:x,
            y:y
        });

        tilesToReveal.push({
            x: x,
            y: y,
            value: board[x][y],
        });

        if(board[x][y] !== 0){
            return tilesToReveal;
        }

        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x+1, y, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x-1, y, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x, y+1, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x, y-1, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x+1, y+1, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x+1, y-1, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x-1, y+1, board, visited));
        tilesToReveal = tilesToReveal.concat(this.getCoordinatesToReveal(x-1, y-1, board, visited));

        return tilesToReveal;
    }

    checkCoordinates(x: number, y: number): Tile[] {
        let board = this.generateBoard();
        return this.getCoordinatesToReveal(x, y, board);
    }

    generateBoard(): number[][] {
        const rng = seedrandom(String(this.seed));
        let arr1 = new Array<number[]>(this.height); 

        for(let i = 0; i < arr1.length; i++){
            let arr2 = new Array<number>(this.width);
            arr1[i] = arr2;
            for(let j = 0; j < arr2.length; j++){
                arr2[j] = 0;
            }
        }

        let minesToPlace = this.mines;
        let spacesLeft = this.area;

        for(let i = 0; i < arr1.length; i++){
            for(let j = 0; j < arr1[i].length; j++){
                if(rng() <= minesToPlace/spacesLeft){
                    arr1[i][j] = -1;
                    minesToPlace--;
                }
                spacesLeft--;
            }
        }

        for(let i = 0; i < arr1.length; i++){
            for(let j = 0; j < arr1[i].length; j++){
                
                if(arr1[i][j] == -1){
                    continue;
                }

                let leftInBounds = i > 0;
                let rightInBounds = i < (arr1.length -1)
                let upInBounds = j > 0;
                let downInBounds = j < (arr1[i].length - 1);

                if (leftInBounds && (arr1[i-1][j] == -1)){
                    arr1[i][j]++;
                }

                if (rightInBounds && (arr1[i+1][j] == -1)){
                    arr1[i][j]++;
                }

                if (upInBounds && (arr1[i][j-1] == -1)){
                    arr1[i][j]++;
                }

                if(downInBounds && (arr1[i][j+1] == -1)){
                    arr1[i][j]++;
                }
                
                if(downInBounds && rightInBounds && arr1[i+1][j+1] == -1){
                    arr1[i][j]++;
                }

                if(downInBounds && leftInBounds && arr1[i-1][j+1] == -1){
                    arr1[i][j]++;
                }

                if(upInBounds && rightInBounds && arr1[i+1][j-1] == -1){
                    arr1[i][j]++;
                }

                if(upInBounds && leftInBounds && arr1[i-1][j-1] == -1){
                    arr1[i][j]++;
                }

            }
        }
        return arr1;
    }

    static generateSeed(): number {
        let randomNumber = Math.random();
        randomNumber = randomNumber* Math.pow(10, 8);
        randomNumber = Math.trunc(randomNumber); 
        return randomNumber;
    }
}