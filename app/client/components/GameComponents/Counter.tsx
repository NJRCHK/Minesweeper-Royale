import * as React from 'react';

type CounterProps = {
    mines: number
}

export default function Counter(props: CounterProps) {
    return (
        <div className="game-bar-item">{("000" + props.mines).slice(-4)}</div>    
    )
}