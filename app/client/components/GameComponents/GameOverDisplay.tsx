import * as React from 'react';
import { GameOverDisplayProps } from '../../../shared/types';

export default function GameOverDisplay (props: GameOverDisplayProps) {
    function renderWinnerDisplay() {
        return (
            <div className='game-over-display-text'>
                <div className='game-over-display-text-heading'>
                    You won!
                </div>
                <div className='game-over-display-text-body'>
                    <div>
                        Time Taken: {props.timeTaken} {props.timeTaken > 1 ? "second" : "seconds"}
                    </div>
                </div>
            </div>
        )
    }

    function renderLoserDisplay() {
        return (
            <div className='game-over-display-text'>
                <div className='game-over-display-text-heading'>
                    Game Over!
                </div>
                <div className='game-over-display-text-body'>
                    <div>
                        Winner: {props.winner}
                    </div>
                    <div>
                        You placed: {props.position}
                    </div>
                    <div>
                        Time Taken: {props.timeTaken} {props.timeTaken > 1 ? "second" : "seconds"}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='game-over-display'>
            {(props.position === 1) ? renderWinnerDisplay() : renderLoserDisplay()}
        </div>
    );
}
