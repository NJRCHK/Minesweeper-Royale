import * as React from 'react';
import {useState, useEffect} from 'react';

type GameProps = {
    handleClickBack: () => void
}

export default function Game(props: GameProps){
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.addEventListener('open', () => {
            console.log("Socket is open");
        });

        socket.addEventListener('close', () => {
            console.log("Disconnected from server");
        });

        socket.addEventListener('message', message => {
            console.log(message.data);
        });
        
        return () => {
            socket.close();
        }
    }, []);

    return(
        <div>
            <h1>Game</h1>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};