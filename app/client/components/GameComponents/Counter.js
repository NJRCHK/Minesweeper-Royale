import React from 'react';

export default function Counter(props) {
    return (
        <div className="game-bar-item">{("000" + props.minesRemaining).slice(-4)}</div>    
    )
}