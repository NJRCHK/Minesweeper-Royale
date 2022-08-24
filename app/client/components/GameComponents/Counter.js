import React, {useState} from 'react';

export default function Counter(props) {
    const [minesRemaining, setMinesRemaining] = useState(props.mines);

    return (
        <div className="game-bar-item">{("000" + minesRemaining).slice(-4)}</div>    
    )
}