import React, {useState} from 'react';
import Board from '../../shared/Board.js';
import Timer from './GameComponents/Timer.js';
import ResetButton from './GameComponents/ResetButton.js';
import Counter from './GameComponents/Counter.js';
import BoardDisplay from './GameComponents/BoardDisplay.js';

export default function(props) {
    const [board ,setBoard] = useState(new Board(props.config.height, props.config.width, props.config.mines));
    const [minesRemaining, setMinesRemaining] = useState(props.config.mines);

    return (
        <div className="singleplayer-game">
            <div className="game-bar">
                <Counter minesRemaining={minesRemaining}/>
                <ResetButton />
                <Timer />
            </div>
            <BoardDisplay height={board.height} width={board.width}/>
        </div>                
    );
}