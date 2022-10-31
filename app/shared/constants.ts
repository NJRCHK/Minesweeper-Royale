import { Config } from "./types";
export const MIDDLECLICK_EVENT_BUTTON = 1;
export const MAX_CHAT_MESSAGE_LENGTH = 256;
export const TIME_BETWEEN_GAMES_MS = 1000 * 10;
export const BEGINNERCONFIG ={
    height: 9,
    width: 9,
    mines: 10
} as Config;
export const INTERMEDIATECONFIG ={
    height: 16,
    width: 16,
    mines: 40
} as Config;
export const EXPERTCONFIG ={
    height: 16,
    width: 30,
    mines: 99
} as Config;
export const SOCKET_ADDRESS = 'ws://chksweeper.com:8080';
