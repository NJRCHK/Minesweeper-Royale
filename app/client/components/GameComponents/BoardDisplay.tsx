import * as React from 'react';
import {useState} from 'react';
import Tile from './Tile.js';

type BoardDisplayProps = {
    height: number,
    width: number,
    tiles: number[][],
    tileClicked: (x: number, y: number) => void
    tileRightClicked: (x: number, y: number) => void
}

export default function BoardDisplay(props: BoardDisplayProps) {

    function renderBoard() {
        let rows = new Array(props.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array(props.width);
            for(let j = 0; j < row.length; j++){
                row[j] = <Tile revealed={props.tiles[i][j]} tileClicked={props.tileClicked} tileRightClicked={props.tileRightClicked} key={Number(String(i) + j)} x={i}y={j}/>
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}   