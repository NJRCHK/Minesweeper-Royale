import React, {useState} from 'react';
import Timer from './GameComponents/Timer.js';
import ResetButton from './GameComponents/ResetButton.js';
import Counter from './GameComponents/Counter.js';
import BoardDisplay from './GameComponents/BoardDisplay.js';
import Board from '../../shared/Board.js';


export default function(props) {

    const boardStartState = {
        gameOver: false,
        height: props.config.height,
        width: props.config.width,
        mines: props.config.mines,
        minesRemaining: props.config.mines,
        seed: Board.generateSeed(),
        squaresRemaining: (props.config.height * props.config.width) - props.config.mines,
        tiles: createTiles(props.config.height, props.config.width),
    }

    const [board, setBoard] = useState(boardStartState);

    function createTiles(height, width) {
        let tilesRows = new Array(height);
        for(let i = 0; i < height; i++){
            let row = new Array(width);
            for(let j = 0; j < width; j++){
                row[j]=-2;
            }
            tilesRows[i] = row;
        }
        return tilesRows;
    }

    function tileClicked (x, y){
        if(board.gameOver){
            return;
        }
        let tempBoard = new Board(board.height, board.width, board.mines, board.seed);
        let value = tempBoard.checkCoordinates(x, y);

        setBoard(prevBoard => {
            let temp = {
                ...prevBoard,
            }
            temp.tiles[x][y] = value;
            return temp;
        });

        if(value === -1){
            setBoard(prevBoard => {
                return {
                    ...prevBoard,
                    gameOver: true
                }
            });
        }
    }

    function restartGame() {
        setBoard(boardStartState);

    }

    return (
        <div className="singleplayer-game">
            <div className="game-bar">
                <Counter mines={props.config.mines}/>
                <ResetButton 
                    clickEvent={restartGame}
                    gameOver={board.gameOver}
                />
                <Timer />
            </div>
            <BoardDisplay 
                board={board}
                tileClicked={tileClicked}
            />
        </div>                
    );
}