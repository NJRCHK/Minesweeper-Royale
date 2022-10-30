import React, { SyntheticEvent } from "react";

export type Point = {
    x: number;
    y: number;
}

export type Tile = {
    x: number,
    y: number,
    value: TileValue;
}

export type Config = {
    height: number;
    width: number;
    mines: number;
}

export type BoardDisplayProps = {
    height: number,
    width: number,
    tiles: TileValue[][],
    tileClicked: (x: number, y: number) => void
    tileRightClicked: (x: number, y: number) => void
}

export type SinglePlayerGameProps = {
    config: Config;
}

export type ChatMessage = {
    username: String;
    message: String;
}

export type ConnectData = {
    cookie: string;
}

export type ChatMessageProps = {
    messages: ChatMessage[];
    sendChatMessage: (message: string) => void;
}

export type ServerMessageRoute = "newconnection" | "chat" | "leaderboard" | "updateplayer";

export type ServerMessage = {
    route: ServerToClientRoutes;
    data: Object;
}

export type LeaderboardEntry = {
    username: String,
    squaresRemaining: number, 
    percentage: number
}

export type LeaderboardProps = {
    leaderboardData: LeaderboardEntry[];
}

export enum ServerToClientRoutes {
    NEWCONNECTION = 0,
    CHAT = 1,
    UPDATEPLAYER = 2,
    LEADERBOARD = 3,
    NEWGAME = 4,
    TIMER = 5,
}

export enum ClientToServerRoutes {
    CLICK = 0,
    CHAT = 1,
    CONNECT = 2,
    NAMECHANGE = 3,
    RESETPLAYER = 4,
}

export enum AppStates {
    MAINMENU = 0,
    MULTIPLAYERGAME = 1,
    SINGLEPLAYERMENU = 2,
    SINGLEPLAYERGAME = 3,
}

export type ClientMessage = {
    route: ClientToServerRoutes,
    data: Object;
}

export type FirstConnectionMessageData = {
    id: number;
    gamestate: boolean;
    player: Player;
    leaderboard: LeaderboardEntry[];
    time: number;
}

export type LeaderboardMessage = {
    leaderboard: LeaderboardEntry[],
    gamestate: boolean    
}

export type Player = {
    id: number;
    username: string;
    alive: boolean;
    board: BoardServerData;
}

export type BoardServerData = {
    height: number;
    mines: number;
    minesRemaining: number;
    width: number;
    tiles: TileValue[][];
}

export type UpdatePlayerMessageData = {
    gamestate: boolean;
    player: Player;
}

export type SinglePlayerMenuButtonProps = {
    startSinglePlayerGame: (arg0: Config) => void; 
};

export type MainMenuProps = {
    handleClickMultiplayer: () => void;
    handleClickSingleplayer: () => void;
    startSinglePlayerGame: (arg0: Config) => void;
};

export type TimerProps = {
    time: number;
}

export type TileProps = {
    x: number,
    y: number, 
    revealed: number,
    tileClicked: (x: number, y: number) => void,
    tileRightClicked: (x: number, y: number) => void,
}

export type ResetButtonProps = {
    clickEvent: () => void;
    multiplayer: boolean;
    gameState?: string;
    isAlive?: boolean;
    inProgress?: boolean;
    isWinning?: boolean;
}

export type CounterProps = {
    mines: number
}

export enum TileValue {
    EMPTY = 0,
    BOMB = -1,
    BLANK = -2, 
    FLAG = -3,
    QUESTIONMARK = -4,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8
}

export enum HeaderStates {
    DEFAULT=0,
    LOGIN = 1,
    CREATEACCOUNT =2
}

export type GameOverDisplayProps = {
    position: number
    timeTaken: number;
    winner: String
};

export type NewGameMessageData = {
    leaderboard: LeaderboardEntry[];
    board: BoardServerData;
    gamestate: boolean
}

export type HeaderProps = {
     updateAccountStatus: (loggedIn: boolean, username: string) => void; 
     returnToHomeScreen: () => void;
     loggedIn: boolean;  
}

export type AccountMenuProps = {
    updateAccountStatus: (loggedIn: boolean, username: string) => void;   
    closeView: (event?: React.SyntheticEvent) => void;
}

export class UserSession {
    loggedIn: boolean = false;
    username: string = "";
}

export type GameProps = {
    account: UserSession
}

export enum GameDifficulty  {
    BEGINNER=1,
    INTERMEDIATE=2,
    EXPERT=3,
}
