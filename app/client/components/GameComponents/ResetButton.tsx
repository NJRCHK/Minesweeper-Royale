import * as React from 'react';
import { ResetButtonProps } from '../../../shared/types';

export default function ResetButton(props: ResetButtonProps) {
    
    function calculateSmileSingleplayer() {
        if(props.gameState === undefined){
            throw `Invalid prop format`;
        }
        if(props.gameState === "inprogress"){
            return ":)";
        }
        else if (props.gameState === "gameover"){
            return ":(";
        }
        return "8)";
    }

    function calculateSmileMultiplayer() {
        if(props.isAlive === undefined|| props.inProgress === undefined || props.isWinning === undefined){
            throw `Invalid prop format`;
        }
        if(props.isAlive && props.inProgress){
            return ":)";
        }
        else if (props.inProgress){
            return ":(";
        }
        else if (!props.inProgress && props.isWinning) {
            return "8)";
        }
        else {
            return ":(";
        }
    }
    
    function calculateSmile(){
        if(props.multiplayer){
            return calculateSmileMultiplayer();
        } else {
            return calculateSmileSingleplayer();
        }
    }


    return (
        <div onClick={props.clickEvent} className="game-reset-button">{calculateSmile()}</div>
    );
};
