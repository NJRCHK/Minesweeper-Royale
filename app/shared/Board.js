import seedrandom from 'seedrandom';

export default class Board{
    constructor(height, width, mines, seed){
        this.height = height;
        this.width = width;
        this.mines = mines;
        this.seed = (seed === undefined) ? Board.generateSeed() : seed;
    }

    get area() {
        return this.width * this.height;
    }

    #isVisited(x, y, visited){
        for(let i = 0; i < visited.length; i++){
            if(visited[i].x === x && visited[i].y === y){
                return true;
            }
        }
        return false;
    }

    getCoordinatesToReveal(x, y, board, visited) {        
        let pointsToReveal = [];

        if(this.#isVisited(x,y,visited)){
            return pointsToReveal;
        }
        visited.push({
            x:x,
            y:y
        });
        if((x<0 || x>=board.length) || (y<0 || y>=board.height)){
            return pointsToReveal;
        }

        pointsToReveal.push({
            x:x,
            y:y,
            val:board[x][y],
        });

        if(board[x][y] !== 0){
            return pointsToReveal;
        }

        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x+1, y, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x-1, y, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x, y+1, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x, y-1, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x+1, y+1, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x+1, y-1, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x-1, y+1, board, visited));
        pointsToReveal = pointsToReveal.concat(this.getCoordinatesToReveal(x-1, y-1, board, visited));
        return pointsToReveal;
    }

    checkCoordinates(x, y) {
        let board = this.#generateBoard();
        return this.getCoordinatesToReveal(x, y, board, []);
    }

    #generateBoard() {
        const rng = seedrandom(this.seed);

        let arr1 = new Array(this.width);

        for(let i = 0; i < arr1.length; i++){
            let arr2 = new Array(this.height);
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

    static generateSeed() {
        let randomNumber = Math.random();
        randomNumber = randomNumber* Math.pow(10, 8);
        randomNumber = Math.trunc(randomNumber); 
        return randomNumber;
    }
}