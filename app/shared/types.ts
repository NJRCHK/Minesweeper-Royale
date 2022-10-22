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

export type LoginProps = {
    handleClickBack: () => void;
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
}

export enum ClientToServerRoutes {
    CLICK = 0,
    CHAT = 1,
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

export type Player = {
    id: number;
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
    handleClickLogin: () => void;
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

