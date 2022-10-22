import * as React from 'react';
import {useState, useEffect} from 'react';
import Counter from './GameComponents/Counter';
import ResetButton from './GameComponents/ResetButton';
import Timer from './GameComponents/Timer';
import BoardDisplay from './GameComponents/BoardDisplay';
import Board from '../../shared/Board';
import Chat from './Chat';
import Leaderboard from './GameComponents/Leaderboard';
import { BoardDisplayProps, ChatMessage, LeaderboardEntry, ServerMessage } from '../../shared/types';

type FirstConnectionMessageData = {
    id: number;
    gamestate: boolean;
    player: Player;
    leaderboard: LeaderboardEntry[];
}

type Player = {
    id: number;
    alive: boolean;
    board: BoardServerData;
}

type BoardServerData = {
    height: number;
    mines: number;
    minesRemaining: number;
    width: number;
    tiles: number[][];
}

type UpdatePlayerMessageData = {
    gamestate: boolean;
    player: Player;
}

export default function Game(){

    const [socket, setSocket] = useState({} as WebSocket);

    const [myPlayer, setMyPlayer] = useState({} as Player);
    const [leaderboard, setLeaderboard] = useState([] as LeaderboardEntry[]);

    const [chatMessages, setChatMessages] = useState([] as ChatMessage[]);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        setSocket(newSocket);
        return () => {
            newSocket.close();
        }
    }, [setSocket]);

    useEffect(() => {
        const openEventListener = () => {
            console.log("Connected to server");
        }

        const closeEventListener = () => {
            console.log("Disconected from server")
        }

        const messageEventListener = (message: MessageEvent<any>) => {
            let parsedMessage = validateMessage(message.data);
            handleMessage(parsedMessage);
        }

        if('url' in socket){
            socket.addEventListener("open", openEventListener);
            socket.addEventListener("close", closeEventListener);
            socket.addEventListener("message", messageEventListener);
        }

        return () => {
            if(!('url' in socket)){
                return;
            }
            socket.removeEventListener("open", openEventListener);
            socket.removeEventListener("close", closeEventListener);
            socket.removeEventListener("message", messageEventListener);
        }
    }, [myPlayer, leaderboard, socket, chatMessages]);

    function handleMessage(message: ServerMessage) {
        switch(message.route){
            case "chat":
                handleChatMessage(message.data);
                break;
            case "newconnection":
                handleFirstConnection(message.data);
                break;
            case "updateplayer": 
                updatePlayer(message.data);
                break;
            case "leaderboard":
                updateLeaderboard(message.data);
        }
    }

    function verifyLeaderboardData(data: any){
        //TODO: verify that the data recieved matches the required structure
        return data as LeaderboardEntry[];
    }

    function updateLeaderboard(data: any){
        const leaderboardData = verifyLeaderboardData(data);
        setLeaderboard(leaderboardData);
    }

    function verifyPlayerData(data: any) {
        //TODO: verify that the data recieved matches the required structure
        return data as UpdatePlayerMessageData;
    }

    function updatePlayer(message: any) {
        const data = verifyPlayerData(message);
        setMyPlayer(oldState => {
            return {
                ...oldState,
               board: data.player.board
            }
        });
    }

    function verifyFirstConnectionData(message: any) {
        if(Object.keys(message).length !== 4){
            throw `Error: Message doesn't contain the correct number of properties.  Properties required: 2 Message: ${JSON.stringify(message)}`;
        }
        if(!('gamestate' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        if(!('id' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        if(!('player' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;            
        }
        if(!('leaderboard' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;            
        }
        return message as FirstConnectionMessageData;
    }

    function handleFirstConnection(message: Object) {
        const data = verifyFirstConnectionData(message);
        setMyPlayer({
            alive: true,
            id: data.id,
            board: data.player.board,
        });
        setLeaderboard(data.leaderboard);
    }

    function validateChatMessage(message: Object) {
        if(Object.keys(message).length !== 2){
            throw `Error: Message doesn't contain the correct number of properties.  Properties required: 2 Message: ${JSON.stringify(message)}`;
        }
        if(!('username' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        if(!('message' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        return message as ChatMessage;
    }

    function handleChatMessage(message: Object) {
        let chatMessage = validateChatMessage(message);
        setChatMessages(prevChatMessages => {
            let copyOfPrevChat = [...prevChatMessages];
            copyOfPrevChat.push(chatMessage);
            if(copyOfPrevChat.length > 30){
                copyOfPrevChat.shift();
            }
            return copyOfPrevChat;
        });
    }

    function sendChatMessage(message: string) {
        const dataToSend = JSON.stringify({
            data: {
                message: message,
            },
            route: "chat"
        });
        socket.send(dataToSend);
    }

    function validateMessage(message: any) {
        let parsedMessage = JSON.parse(message);
        if(typeof parsedMessage === "string"){
            parsedMessage = JSON.parse(parsedMessage);
        }
        if(Object.keys(parsedMessage).length !== 2){
            throw `Error: Message doesn't contain the correct number of properties.  Properties required: 2 Message: ${JSON.stringify(parsedMessage)}`;
        }
        if(!('route' in parsedMessage)){
            throw `Error: Message doesn't contain route property. Message: ${JSON.stringify(parsedMessage)}`;
        }
        if(!('data' in parsedMessage)){
            throw `Error: Message doesn't contain data property. Message: ${JSON.stringify(parsedMessage)}`;
        }
        return parsedMessage as ServerMessage;
    }

    function contextMenu(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function tileClicked(x: number, y: number) {
        const data = {
            "route": "click",
            "data": {
                "x": x,
                "y": y,
            }
        }
        socket.send(JSON.stringify(data));
    }

    function tileRightClicked (x: number, y: number): void {
        let tile = myPlayer.board.tiles[x][y];
        //if tile is shown do nothing
        if(tile > 0){
            return;
        }
        //if tile is covered put a flag on it and decrement the mines counter
        else if(tile === -2){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = -3;
                temp.board.minesRemaining--;
                return temp;
            });
        }
        // if tile has flag put a question mark on it and increment the mines counter
        else if(tile === -3){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = -4;
                temp.board.minesRemaining++;
                return temp;
            });
        }
        //if tile has question mark on it remove it 
        else if(tile === -4){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = -2;
                return temp;
            });
        }
    }

    function renderBoard() {
        return (
            <div className="singleplayer-game" onContextMenu={contextMenu}>
                <div className="game-bar">
                    <Counter mines={myPlayer.board.minesRemaining}/>
                    <ResetButton 
                        clickEvent={() => {return}}
                        gameState="gamewon"
                    />
                    <Timer />
                </div>
                <BoardDisplay 
                    height={myPlayer.board.height}
                    width={myPlayer.board.width}
                    tiles={myPlayer.board.tiles}
                    tileClicked={tileClicked}
                    tileRightClicked={tileRightClicked}
                />
            </div>


        )
    }
    return(
        <div className='game-wrapper'>
            {myPlayer.id && renderBoard()}
            <div className='leaderboard-chat-wrapper'>
                <Leaderboard leaderboardData={leaderboard}/>
                <Chat sendChatMessage={sendChatMessage} messages={chatMessages}/>
            </div>
        </div>
    );
};
