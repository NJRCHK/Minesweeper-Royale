import * as React from 'react';
import { TimerProps } from '../../../shared/types';

export default function Timer(props: TimerProps) {
    return (
        <div className="game-bar-item">{("000" + props.time).slice(-4)}</div>
    )
}
