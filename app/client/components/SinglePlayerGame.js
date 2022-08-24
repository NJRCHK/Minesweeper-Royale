import React from 'react';
import Timer from './GameComponents/Timer.js';
import ResetButton from './GameComponents/ResetButton.js';
import Counter from './GameComponents/Counter.js';
import BoardDisplay from './GameComponents/BoardDisplay.js';

export default function(props) {

    function gameOver() {
        console.log("Game Over");
    }

    return (
        <div className="singleplayer-game">
            <div className="game-bar">
                <Counter mines={props.config.mines}/>
                <ResetButton />
                <Timer />
            </div>
            <BoardDisplay 
                height={props.config.height} 
                width={props.config.width} 
                mines={props.config.mines}
                gameOver={gameOver}
            />
        </div>                
    );
}