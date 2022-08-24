import React, {useState} from 'react';
import Board from '../../../shared/Board.js';
import Tile from './Tile.js';

export default function BoardDisplay(props) {
    
    const [board, setBoard] = useState({
        height: props.height,
        width: props.width,
        seed: props.seed,
        squaresRemaining: (props.height * props.width) - props.mines,
    });

    function renderBoard() {
        let rows = new Array(board.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array(board.width);
            for(let j = 0; j < board.height; j++){
                row[j] = <Tile tileClicked={tileClicked} key={Number(String(i) + j)} x={j}y={i}/>
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    function tileClicked (x, y){
        console.log("Tile Clicked. POS: " + x + " " + y);
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}   