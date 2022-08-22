import React, {useState} from 'react';
import Board from '../../shared/Board.js';
import Tile from './Tile.js';

export default function(props) {
    const [board ,setBoard] = useState(new Board(props.config.height, props.config.width, props.config.mines));
    console.log(board);

    function renderBoard() { 
        let widthArray = new Array(board.width);
        for(let i = 0; i < widthArray.length; i++){
            let heightArray = new Array(board.height);
            for(let j = 0; j < heightArray.length; j++){
                heightArray[j] = <div className="game-tile" key={Number(String(i) + j)}></div>
            }
            widthArray[i] = <div className="game-row" key={i}>{heightArray}</div>;
        }
        console.log(widthArray);
        return <div clasName="singleplayer-game-board">{widthArray}</div>;
    }
    return (
        <div className="singleplayer-game">
            {renderBoard()}
        </div>                
    );
}