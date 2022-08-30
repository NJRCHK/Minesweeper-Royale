import React from 'react';

export default function ResetButton(props) {

    function calculateSmile(){
        switch(props.gameState){
            case "gameover":
                return ":(";
            case "gamewon":
                return "8)";
            case "inprogress":
                return ":)";
        }
    }

    return (
        <div onClick={props.clickEvent} className="game-reset-button">{calculateSmile()}</div>
    )
}