import * as React from 'react';
import { useState } from 'react';
import Tile from './Tile';
import { BoardDisplayProps, TileValue } from '../../../shared/types';

export default function BoardDisplay(props: BoardDisplayProps) {

    function setupHeldTileUI(){
        let temp: boolean[][] = [];
        for(let i = 0; i < props.height; i++){
            temp.push([]);
            for(let j = 0; j < props.width; j++){
                temp[i].push(false);
            }
        }
        return temp;
    }
    const [heldTiles, setHeldTiles]= useState(setupHeldTileUI());

    function isFlagged(x: number, y: number){
        if(!isValidTile(x, y)){
            return false;
        }
        return props.tiles[x][y] === TileValue.FLAG;
    }

    function isValidTile(x:number, y:number){
        if(x < 0 || x >= props.width){
            return false;
        }
        else if (y < 0 || y >= props.height){
            return false;
        }
        return true;
    }

    function middleClickHeld(held: boolean, x: number, y: number) {
        if(props.tiles[x][y] === TileValue.BLANK){
            leftClickHeld(held, x, y);
            return;
        }
        
        setHeldTiles(prevHeld => {
            let temp = JSON.parse(JSON.stringify(prevHeld));
            isValidTile(x+1,y+1) && !isFlagged(x+1, y+1)&& (temp[x+1][y+1] = held);
            isValidTile(x-1,y+1) && !isFlagged(x-1, y+1)&& (temp[x-1][y+1] = held);
            isValidTile(x,y+1)   && !isFlagged(x,   y+1)&& (temp[x][y+1] = held);  
            isValidTile(x-1,y)   && !isFlagged(x-1, y)  && (temp[x-1][y] = held);
            isValidTile(x+1,y)   && !isFlagged(x+1, y)  && (temp[x+1][y] = held);
            isValidTile(x,y-1)   && !isFlagged(x, y-1)  && (temp[x][y-1]  = held);
            isValidTile(x-1,y-1) && !isFlagged(x-1,y-1) && (temp[x-1][y-1] = held);
            isValidTile(x+1,y-1) && !isFlagged(x+1,y-1) && (temp[x+1][y-1] = held);
            return temp;
        });
    }

    function leftClickHeld(held: boolean, x: number, y: number) {
        setHeldTiles(prevHeld => {
            let temp = JSON.parse(JSON.stringify(prevHeld));
            temp[x][y] = held;
            return temp;
        });
    }

    function renderBoard() {
        if((props.height !== heldTiles.length) || (props.width !== heldTiles[0].length)){
            setHeldTiles(setupHeldTileUI());
        }
        let rows = new Array<JSX.Element>(props.height);
        for(let i = 0; i < rows.length; i++){
            let row = new Array<JSX.Element>(props.width);
            for(let j = 0; j < row.length; j++){
                row[j] = <Tile 
                            revealed={props.tiles[i][j]} 
                            tileClicked={props.tileClicked} 
                            tileRightClicked={props.tileRightClicked} 
                            tileMiddleClicked={props.tileMiddleClicked}
                            middleClickHeld={middleClickHeld}
                            leftClickHeld={leftClickHeld}
                            key={Number(String(i) + j)}
                            x={i}y={j}
                            held={heldTiles[i][j]}
                            />
            }
            rows[i] = <div className="game-row" key={i}>{row}</div>;
        }
        return rows;
    }

    return (
        <div className="game-board">{renderBoard()}</div>
    )
}
