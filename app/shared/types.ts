export type Point = {
    x: number;
    y: number;
}

export type Tile = {
    x: number,
    y: number,
    value: number;
}

export type Config = {
    height: number;
    width: number;
    mines: number;
}

export type BoardDisplayProps = {
    height: number,
    width: number,
    tiles: number[][],
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
    tiles: number[][];
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