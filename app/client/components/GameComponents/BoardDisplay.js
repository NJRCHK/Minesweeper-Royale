import React, {useState} from 'react';
import Board from '../../../shared/Board.js';
import Tile from './Tile.js';

export default function BoardDisplay(props) {
    const [board, setBoard] = useState({
        height: props.height,
        width: props.width,
        mines: props.mines,
        seed: Board.generateSeed(),
        squaresRemaining: (props.height * props.width) - props.mines,
        tiles: createTiles(props.height, props.width),
    });

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
        let tempBoard = new Board(board.height, board.width, board.mines, board.seed);
        let value = tempBoard.checkCoordinates(x, y);
        setBoard(prevBoard => {
            let temp = {
                ...prevBoard,
            }
            temp.tiles[x][y] = value;
            return temp;
        });
    }

    function renderBoard() {
        let rows = new Array(board.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array(board.width);
            for(let j = 0; j < board.height; j++){
                row[j] = <Tile revealed={board.tiles[j][i]} tileClicked={tileClicked} key={Number(String(i) + j)} x={j}y={i}/>
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}   