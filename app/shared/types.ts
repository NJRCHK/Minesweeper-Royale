export type Point = {
    x: number;
    y: number;
}

export type BoardDisplayProps = {
    height: number,
    width: number,
    tiles: number[][],
    tileClicked: (x: number, y: number) => void
    tileRightClicked: (x: number, y: number) => void
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
    route: ServerMessageRoute;
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