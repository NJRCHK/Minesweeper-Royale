import * as React from 'react';
import {useState, useEffect} from 'react';

export default function Timer() {
    const [time, setTime] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime+1);
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="game-bar-item">{("000" + time).slice(-4)}</div>
    )
}