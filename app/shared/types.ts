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
}

export enum ClientToServerRoutes {
    CLICK = 0,
    CHAT = 1,
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

export type TileProps = {
    x: number,
    y: number, 
    revealed: number,
    tileClicked: (x: number, y: number) => void,
    tileRightClicked: (x: number, y: number) => void,
}

export type ResetButtonProps = {
    clickEvent: () => void
    gameState: string
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
    
}

export type CreateAccountMenuProps = {
    
}
