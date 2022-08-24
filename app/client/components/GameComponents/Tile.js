import React, {useState} from 'react';

export default function Tile(props) {
    
    return (
        <div className="game-tile" onClick={()=>{
            props.tileClicked(props.x, props.y);
        }}>{props.revealed === -2 ? "" : props.revealed}</div>
    )
}