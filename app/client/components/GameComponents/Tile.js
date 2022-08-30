import React from 'react';

export default function Tile(props) {

    function getClassName(){
        return props.value === -1 ? "game-tile-shown" : "game-tile-hidden";
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