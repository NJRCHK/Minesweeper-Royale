import React, {useState} from 'react';
import Board from '../../../shared/Board.js';
import Tile from './Tile.js';

export default function BoardDisplay(props) {

    function renderBoard() {
        let rows = new Array(props.board.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array(props.board.width);
            for(let j = 0; j < row.length; j++){
                row[j] = <Tile revealed={props.board.tiles[i][j]} tileClicked={props.tileClicked} tileRightClicked={props.tileRightClicked} key={Number(String(i) + j)} x={i}y={j}/>
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}   