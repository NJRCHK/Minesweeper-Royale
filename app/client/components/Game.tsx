import * as React from 'react';

type GameProps = {
    handleClickBack: () => void
}

export default function Game(props: GameProps){
    return(
        <div>
            <h1>Game</h1>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};