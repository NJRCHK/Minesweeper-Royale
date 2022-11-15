import * as React from 'react';
import { ResetButtonProps } from '../../../shared/types';

export default function ResetButton(props: ResetButtonProps) {
    
    function calculateSmileSingleplayer() {
        if(props.gameState === undefined){
            throw `Invalid prop format`;
        }
        if(props.gameState === "inprogress"){
            return <img className="reset-button" src="http://localhost:3000/img/SMILE.png"/>;
        }
        else if (props.gameState === "gameover"){
            return <img className="reset-button" src="http://localhost:3000/img/FROWN.png"/>;
        }
        return <img className="reset-button" src="http://localhost:3000/img/SUNGLASSES.png"/>;
    }

    function calculateSmileMultiplayer() {
        if(props.isAlive === undefined|| props.inProgress === undefined || props.isWinning === undefined){
            throw `Invalid prop format`;
        }
        if(props.isAlive && props.inProgress){
            return <img className="reset-button" src="http://localhost:3000/img/SMILE.png"/>;
        }
        else if (props.inProgress){
            return <img className="reset-button" src="http://localhost:3000/img/FROWN.png"/>;
        }
        else if (!props.inProgress && props.isWinning) {
            
            return <img className="reset-button" src="http://localhost:3000/img/SUNGLASSES.png"/>;
        }
        else {
            return <img className="reset-button" src="http://localhost:3000/img/FROWN.png"/>;
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
