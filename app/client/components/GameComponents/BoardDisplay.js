import React, {useState} from 'react';
import Tile from './Tile.js';

export default function BoardDisplay(props) {

    function renderBoard() {
        let rows = new Array(props.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array(props.width);
            for(let j = 0; j < props.height; j++){
                row[j] = <Tile tileClicked={props.tileClicked} key={Number(String(i) + j)} x={j}y={i}/>
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}   