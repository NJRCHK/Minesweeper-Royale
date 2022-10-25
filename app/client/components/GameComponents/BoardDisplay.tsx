import * as React from 'react';
import Tile from './Tile';
import { BoardDisplayProps } from '../../../shared/types.js';

export default function BoardDisplay(props: BoardDisplayProps) {

    function renderBoard() {
        let rows = new Array<JSX.Element>(props.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array<JSX.Element>(props.width);
            for(let j = 0; j < row.length; j++){
                row[j] = <Tile 
                            revealed={props.tiles[i][j]} 
                            tileClicked={props.tileClicked} 
                            tileRightClicked={props.tileRightClicked} 
                            key={Number(String(i) + j)} 
                            x={i}y={j}
                            />
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}
