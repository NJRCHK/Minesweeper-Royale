import * as React from 'react';
import {useState, useEffect} from 'react';
import Counter from './GameComponents/Counter';
import ResetButton from './GameComponents/ResetButton';
import Timer from './GameComponents/Timer';
import BoardDisplay from './GameComponents/BoardDisplay';
import Board from '../../shared/Board';
import Chat from './Chat';
import { BoardDisplayProps, ChatMessage } from '../../shared/types';
type ServerMessage = {
    route: "newconnection" | "chat" | "updateplayer";
    data: Object;
}
type FirstConnectionMessageData = {
    id: number;
    gamestate: boolean;
    players: Player[]
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

type GameProps = {
    handleClickBack: () => void
}

export default function Game(props: GameProps){

    const [socket, setSocket] = useState({} as WebSocket);

    const [myPlayer, setMyPlayer] = useState({} as Player);
    const [opponents, setOpponents] = useState([] as Player[]);

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
    }, [myPlayer, opponents, socket, chatMessages]);

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
        }
    }

    function verifyPlayerData(data: any) {
        //TODO: verify that the data recieved matches the structure
        return data as UpdatePlayerMessageData;
    }

    function updatePlayer(message: any) {
        const data = verifyPlayerData(message);
        if(data.player.id === myPlayer.id){
            setMyPlayer(oldState => {
                return {
                    ...oldState,
                    board: data.player.board
                }
            });
            return;
        }
        opponents.forEach((opponent, index) => {
            if(!(opponent.id === data.player.id)){
                return;
            }
            let clonedOpponents = [...opponents];
            clonedOpponents[index] = data.player;
            setOpponents(clonedOpponents);
        });
    }

    function verifyFirstConnectionData(message: any) {
        if(Object.keys(message).length !== 3){
            throw `Error: Message doesn't contain the correct number of properties.  Properties required: 2 Message: ${JSON.stringify(message)}`;
        }
        if(!('gamestate' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        if(!('id' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }
        if(!('players' in message)){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;            
        }
        if(!(Array.isArray(message.players))){
            throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
        }

        for(let i = 0; i < message.players.length; i++){
            const player = message.players[i];
            if(!('alive' in player)){
                throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
            }
            if(!('board' in player)){
                throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
            }
            if(!('id' in player)){
                throw `Error: Message doesn't contain correct properties. Message: ${JSON.stringify(message)}`;
            }
        }
        return message as FirstConnectionMessageData;
    }

    function getMyBoardFromPlayers(data: FirstConnectionMessageData) {
        for(let i = 0; i < data.players.length; i++){
            if(data.players[i].id === data.id){
                return data.players[i].board;
            }
        }
        throw `Player data missing from first connection state`;
    }

    function handleFirstConnection(message: Object) {
        const data = verifyFirstConnectionData(message);
        setMyPlayer({
            alive: true,
            id: data.id,
            board: getMyBoardFromPlayers(data)
        });
        
        let tempOpponents = [] as Player[];
        for(let i = 0; i < data.players.length; i++){
            if(data.players[i].id !== data.id){
                tempOpponents.push(data.players[i]);
            }
        }
        setOpponents(tempOpponents);
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
        <div>
            <h1>Game</h1>
            {myPlayer.id && renderBoard()}
            <Chat sendChatMessage={sendChatMessage} messages={chatMessages}/>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};