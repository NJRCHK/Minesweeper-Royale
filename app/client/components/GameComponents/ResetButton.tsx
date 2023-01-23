import * as React from 'react';
import { ResetButtonProps } from '../../../shared/types';
import SMILEIMAGE from '../../../../public/img/SMILE.png';
import FROWNIMAGE from '../../../../public/img/FROWN.png';
import SUNGLASSESIMAGE from '../../../../public/img/SUNGLASSES.png';

export default function ResetButton(props: ResetButtonProps) {
    
    function calculateSmileSingleplayer() {
        if(props.gameState === undefined){
            throw `Invalid prop format`;
        }
        if(props.gameState === "inprogress"){
            return <img className="reset-button" src={SMILEIMAGE}/>;
        }
        else if (props.gameState === "gameover"){
            return <img className="reset-button" src={FROWNIMAGE}/>;
        }
        return <img className="reset-button" src={SUNGLASSESIMAGE}/>;
    }

    function calculateSmileMultiplayer() {
        if(props.isAlive === undefined|| props.inProgress === undefined || props.isWinning === undefined){
            throw `Invalid prop format`;
        }
        if(props.isAlive && props.inProgress){
            return <img className="reset-button" src={SMILEIMAGE}/>;
        }
        else if (props.inProgress){
            return <img className="reset-button" src={FROWNIMAGE}/>;
        }
        else if (!props.inProgress && props.isWinning) {
            
            return <img className="reset-button" src={SUNGLASSESIMAGE}/>;
        }
        else {
            return <img className="reset-button" src={FROWNIMAGE}/>;
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
