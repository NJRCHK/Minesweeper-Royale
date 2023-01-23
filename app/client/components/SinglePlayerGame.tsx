import * as React from 'react';
import {useState, useEffect} from 'react';
import Timer from './GameComponents/Timer';
import ResetButton from './GameComponents/ResetButton';
import Counter from './GameComponents/Counter';
import BoardDisplay from './GameComponents/BoardDisplay';
import Board from '../../shared/Board';
import { SinglePlayerGameProps, TileValue } from '../../shared/types';

export default function(props: SinglePlayerGameProps): JSX.Element {

    const boardStartState = {
        gameState: "inprogress",
        height: props.config.height,
        width: props.config.width,
        mines: props.config.mines,
        minesRemaining: props.config.mines,
        seed: Board.generateSeed(),
        squaresRemaining: (props.config.height * props.config.width) - props.config.mines,
        tiles: createTiles(props.config.height, props.config.width),
    }
    const [board, setBoard] = useState(boardStartState);
    const [time, setTime] = useState(0);
    const [timerTracker, setTimerTracker] = useState(new Array<NodeJS.Timer>);

    //messy bad way to do it but i couldnt think of anything else :(
    useEffect(() => {
        if(board.gameState === "inprogress"){
            setTime(0);
            setTimerTracker([setInterval(() => setTime(time => time + 1), 1000)]);
        } else {
            timerTracker.forEach(timer => {
                clearInterval(timer);
            });
            setTimerTracker([]);
        }
    }, [board.gameState]);

    function createTiles(height: number, width: number): number[][] {
        let tilesRows = new Array<number[]>(height)
        for(let i = 0; i < height; i++){
            let row = new Array<number>(width);
            for(let j = 0; j < width; j++){
                row[j]=TileValue.BLANK;
            }
            tilesRows[i] = row;
        }
        return tilesRows;
    }

    function tileClicked (x: number, y: number): void {
        if(board.gameState !== "inprogress"){
            return;
        }
        //if the tile has been clicked (ie it is not blank, flag or question mark) then return
        if(![TileValue.BLANK, TileValue.FLAG].includes(board.tiles[x][y])){
            return;
        }

        let tempBoard = new Board(board.height, board.width, board.mines, board.seed);
        let values = tempBoard.checkCoordinates(x, y);

        for(let i = 0; i < values.length; i++){
            setBoard(prevBoard => {
                let temp = {...prevBoard}
                if(values[i].value !== TileValue.BOMB && temp.tiles[values[i].x][values[i].y] === TileValue.BLANK){
                    temp.squaresRemaining = temp.squaresRemaining - 1;
                }
                temp.tiles[values[i].x][values[i].y] = values[i].value;
                if(temp.squaresRemaining === 0){
                    temp.gameState ="gamewon";
                }
                return temp;
            });
        }
        if(values[0].value === TileValue.BOMB){
            setBoard(prevBoard => {
                return {
                    ...prevBoard,
                    gameState: "gameover"
                }
            });
        }
    }
    function isValidTile(x:number, y:number){
        if(x < 0 || x >= board.width){
            return false;
        }
        else if (y < 0 || y >= board.height){
            return false;
        }
        return true;
    }

    function isFlagged(x: number, y: number){
        if(!isValidTile(x, y)){
            return false;
        }
        return board.tiles[x][y] === TileValue.FLAG;
    }

    function isClicked(x: number, y: number) {
        let tile = board.tiles[x][y];
        return ![TileValue.BLANK, TileValue.FLAG].includes(tile);
    }

    function allMinesFlaggedAroundTile(x: number, y: number){
        let tileValue = board.tiles[x][y];
        isFlagged(x+1, y+1) && tileValue--;
        isFlagged(x-1, y+1) && tileValue--;
        isFlagged(x,   y+1) && tileValue--;
        isFlagged(x-1, y)   && tileValue--;
        isFlagged(x+1, y)   && tileValue--;
        isFlagged(x, y-1)   && tileValue--;
        isFlagged(x+1,y-1)  && tileValue--;
        isFlagged(x-1,y-1)  && tileValue--;
        return tileValue === 0;
    }

    function tileMiddleClicked(x: number, y: number) {
        if(!isClicked(x, y)){
            tileClicked(x, y);
            return;
        }
        if(!allMinesFlaggedAroundTile(x,y)){
            return;
        }
        isValidTile(x+1,y+1) && !isFlagged(x+1, y+1) && tileClicked(x+1,y+1);
        isValidTile(x-1,y+1) && !isFlagged(x-1, y+1) && tileClicked(x-1,y+1);
        isValidTile(x,y+1) && !isFlagged(x,   y+1) && tileClicked(x,y+1);
        isValidTile(x-1,y) && !isFlagged(x-1, y)   && tileClicked(x-1,y);
        isValidTile(x+1,y) && !isFlagged(x+1, y)   && tileClicked(x+1,y);
        isValidTile(x,y-1) && !isFlagged(x, y-1)   && tileClicked(x,y-1);
        isValidTile(x+1,y-1) && !isFlagged(x+1,y-1)  && tileClicked(x+1,y-1);        
        isValidTile(x-1,y-1) && !isFlagged(x-1,y-1)  && tileClicked(x-1,y-1);
    }

    function tileRightClicked (x: number, y: number): void {
        if(board.gameState !== "inprogress"){
            return;
        }
        let tile = board.tiles[x][y];
        //if tile is shown do nothing
        if(![TileValue.BLANK, TileValue.FLAG].includes(tile)){
            return;
        }
        //if tile is covered put a flag on it and decrement the mines counter
        else if(tile === TileValue.BLANK){
            setBoard(prevBoard => {
                let temp = {
                    ...prevBoard
                };
                temp.tiles[x][y] = TileValue.FLAG;
                temp.minesRemaining--;
                return temp;
            });
        }
        else if(tile === TileValue.FLAG){
            setBoard(prevBoard => {
                let temp = {
                    ...prevBoard
                };
                temp.tiles[x][y] = TileValue.BLANK;
                temp.minesRemaining++;
                return temp;
            });
        }
    }

    function restartGame() {
        setBoard(boardStartState);
    }

    function contextMenu(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    return (
        <div className="singleplayer-game" onContextMenu={contextMenu}>
            <div className="game-bar">
                <Counter mines={board.minesRemaining}/>
                <ResetButton 
                    clickEvent={restartGame}
                    multiplayer={false}
                    gameState={board.gameState}
                />
                <Timer time={time}/>
            </div>
            <BoardDisplay 
                height={board.height}
                width={board.width}
                tiles={board.tiles}
                tileClicked={tileClicked}
                tileRightClicked={tileRightClicked}
                tileMiddleClicked={tileMiddleClicked}
            />
        </div>                
    );
}
