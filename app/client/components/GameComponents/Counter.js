import React from 'react';

export default function Counter(props) {
    return (
        <div className="game-bar-item">{("000" + props.mines).slice(-4)}</div>    
    )
}