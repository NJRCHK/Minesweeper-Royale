import * as React from 'react';
import { TileProps, TileValue } from '../../../shared/types';


export default function Tile(props: TileProps) {

    function getClassName(): string{
        return props.revealed < -1 ? "game-tile-hidden" : "game-tile-shown";
    }

    function getValueToDisplay(): string{
        switch(props.revealed){
            case TileValue.QUESTIONMARK: 
                return "?";
            case TileValue.FLAG:
                return "F";
            case TileValue.BLANK:
                return "";
            case TileValue.BOMB: 
                return "B";
            case TileValue.EMPTY:
                return "";
            default:
                return String(props.revealed);
        }
    }

    return (
        <div className={getClassName()}
            onClick={
                () => {
                    props.tileClicked(props.x, props.y);
                }
            }
            onContextMenu={
                () => {
                    props.tileRightClicked(props.x, props.y);
                }
            }
        >
            {getValueToDisplay()}
        </div>
    )
}
