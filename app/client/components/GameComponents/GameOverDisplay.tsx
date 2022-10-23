import * as React from 'react';
import { GameOverDisplayProps } from '../../../shared/types';

export default function GameOverDisplay (props: GameOverDisplayProps) {
    console.log(props);
    return (
        <div className='game-over-display'></div>
    );
}