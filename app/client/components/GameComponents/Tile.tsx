import * as React from 'react';

type TileProps = {
    x: number,
    y: number, 
    revealed: number,
    tileClicked: (x: number, y: number) => void,
    tileRightClicked: (x: number, y: number) => void,
}

export default function Tile(props: TileProps) {

    function getClassName(){
        return props.revealed < -1 ? "game-tile-hidden" : "game-tile-shown";
    }

    function getValueToDisplay() {
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
                return props.revealed;
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