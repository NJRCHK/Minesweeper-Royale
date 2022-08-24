import React from 'react';

export default function ResetButton(props) {
    return (
        <div onClick={props.clickEvent} className="game-reset-button">{props.gameOver ? ":(" : ":)" }</div>
    )
}