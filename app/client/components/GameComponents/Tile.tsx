import * as React from 'react';
import { TileProps } from '../../../shared/types';


export default function Tile(props: TileProps) {

    function getClassName(): string{
        return props.revealed < -1 ? "game-tile-hidden" : "game-tile-shown";
    }

    function getValueToDisplay(): string{
        switch(props.revealed){
            case -4: 
                return "?";
            case -3:
                return "F";
            case -2:
                return "";
            case -1: 
                return "B";
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