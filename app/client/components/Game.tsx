import * as React from 'react';
import {useState, useEffect} from 'react';
import Counter from './GameComponents/Counter';
import ResetButton from './GameComponents/ResetButton';
import Timer from './GameComponents/Timer';
import BoardDisplay from './GameComponents/BoardDisplay';
import Chat from './Chat';
import Leaderboard from './GameComponents/Leaderboard';
import GameOverDisplay from './GameComponents/GameOverDisplay';
import { 
        ChatMessage, 
        LeaderboardEntry,
        LeaderboardMessage, 
        ServerMessage, 
        ServerToClientRoutes, 
        ClientMessage, 
        ClientToServerRoutes, 
        FirstConnectionMessageData,
        Player,
        UpdatePlayerMessageData,
        TileValue,
        NewGameMessageData,
        GameProps
    } from '../../shared/types';

export default function Game(props: GameProps){

    const [socket, setSocket] = useState({} as WebSocket);

    const [myPlayer, setMyPlayer] = useState({} as Player);
    const [leaderboard, setLeaderboard] = useState([] as LeaderboardEntry[]);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [chatMessages, setChatMessages] = useState([] as ChatMessage[]);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        setSocket(newSocket);
        return () => {
            newSocket.close();
        }
    }, [setSocket]);

    useEffect(() => {
        const openEventListener = () => {
            socket.send(JSON.stringify({
                route: ClientToServerRoutes.CONNECT,
                data: {
                    cookie: document.cookie
                }
            } as ClientMessage))
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

    useEffect(() => {
        updateUsername();
    }, [props.account]);

    function updateUsername() {
        if(! props.account.loggedIn){
            return;
        }
        if(socket.readyState === undefined){
            return;
        }
        if(socket.readyState !== socket.OPEN){
            return;
        }
        const data = {
            route: ClientToServerRoutes.NAMECHANGE,
            data: {
                cookie: document.cookie
            }
        }

        socket.send(JSON.stringify(data));
        setMyPlayer(prevState => {
            return {
                    ...prevState, 
                    username: props.account.username
            }
        })
    }

    function handleMessage(message: ServerMessage) {
        switch(message.route){
            case ServerToClientRoutes.CHAT:
                handleChatMessage(message.data);
                break;
            case ServerToClientRoutes.NEWCONNECTION:
                handleFirstConnection(message.data);
                break;
            case ServerToClientRoutes.UPDATEPLAYER: 
                updatePlayer(message.data);
                break;
            case ServerToClientRoutes.LEADERBOARD:
                updateLeaderboard(message.data);
                break;
            case ServerToClientRoutes.NEWGAME:
                handleNewGame(message.data);
                break;
            case ServerToClientRoutes.TIMER:
                handleTimerMessage(message.data);
        }
    }

    function handleTimerMessage(data: any) {
        let time = data.time;
        setTime(time);
    }

    function handleNewGame(data: any) {
        let newGameData = data as NewGameMessageData;
        setLeaderboard(newGameData.leaderboard);
        setGameInProgress(newGameData.gamestate);
        setMyPlayer(player => {
            let clonedPlayer = {...player};
            clonedPlayer.board = newGameData.board;
            return clonedPlayer;
        });
    }

    function verifyLeaderboardData(data: any){
        //TODO: verify that the data recieved matches the required structure
        return data as LeaderboardMessage;
    }

    function updateLeaderboard(data: any){
        const leaderboardData = verifyLeaderboardData(data);
        setLeaderboard(leaderboardData.leaderboard);
        setGameInProgress(data.gamestate);
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
        setGameInProgress(data.gamestate);
    }

    function verifyFirstConnectionData(message: any) {
        if(Object.keys(message).length !== 5){
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
            username: data.player.username,
            alive: true,
            id: data.id,
            board: data.player.board,
        });
        setGameInProgress(data.gamestate);
        setLeaderboard(data.leaderboard);
        setTime(data.time);
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
            route: ClientToServerRoutes.CHAT
        } as ClientMessage);
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
        let tile = myPlayer.board.tiles[x][y];
        if(![TileValue.BLANK, TileValue.QUESTIONMARK, TileValue.FLAG].includes(tile)){
            return;
        }        
        const data = {
            route: ClientToServerRoutes.CLICK,
            data: {
                "x": x,
                "y": y,
            }
        } as ClientMessage;
        socket.send(JSON.stringify(data));
    }

    function tileRightClicked (x: number, y: number): void {
        if(!gameInProgress || !myPlayer.alive){
            return;
        }
        let tile = myPlayer.board.tiles[x][y];
        //if tile is shown do nothing
        if(![TileValue.BLANK, TileValue.QUESTIONMARK, TileValue.FLAG].includes(tile)){
            return;
        }
        //if tile is covered put a flag on it and decrement the mines counter
        else if(tile === TileValue.BLANK){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = TileValue.FLAG;
                temp.board.minesRemaining--;
                return temp;
            });
        }
        // if tile has flag put a question mark on it and increment the mines counter
        else if(tile === TileValue.FLAG){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = TileValue.QUESTIONMARK;
                temp.board.minesRemaining++;
                return temp;
            });
        }
        //if tile has question mark on it remove it 
        else if(tile === TileValue.QUESTIONMARK){
            setMyPlayer(prevState => {
                let temp = {
                    ...prevState
                };
                temp.board.tiles[x][y] = TileValue.BLANK;
                return temp;
            });
        }
    }

    function getMyPosition() {
        console.log(leaderboard);
        for(let i = 0; i < leaderboard.length; i++){
            if(leaderboard[i].username === myPlayer.username){
                return i + 1;
            }
        }
        throw (`player not present in leaderboard`);
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
                    <Timer time={time}/>
                </div>
                <BoardDisplay 
                    height={myPlayer.board.height}
                    width={myPlayer.board.width}
                    tiles={myPlayer.board.tiles}
                    tileClicked={tileClicked}
                    tileRightClicked={tileRightClicked}
                />
                {!gameInProgress && <GameOverDisplay position={getMyPosition()} timeTaken={time} winner={leaderboard[0].username} />}
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
