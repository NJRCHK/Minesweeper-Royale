import * as React from 'react';

type ResetButtonProps = {
    clickEvent: () => void
    gameState: string
}

export default function ResetButton(props: ResetButtonProps) {

    function calculateSmile(): string{
        switch(props.gameState){
            case "gameover":
                return ":(";
            case "gamewon":
                return "8)";
            default: 
                return ":)";
        };
    };

    return (
        <div onClick={props.clickEvent} className="game-reset-button">{calculateSmile()}</div>
    );
};