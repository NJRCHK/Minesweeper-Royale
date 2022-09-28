import * as React from 'react';
import {useState, useEffect} from 'react';

type GameProps = {
    handleClickBack: () => void
}

export default function Game(props: GameProps){
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        console.log("connected");
        newSocket.addEventListener('message', message => {
            console.log(message.data);
        });
    }, [setSocket]);

    return(
        <div>
            <h1>Game</h1>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};