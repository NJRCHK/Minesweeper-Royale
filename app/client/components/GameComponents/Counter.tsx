import * as React from 'react';
import { CounterProps } from '../../../shared/types';

export default function Counter(props: CounterProps) {
    return (
        <div className="game-bar-item">{("000" + props.mines).slice(-4)}</div>    
    )
}