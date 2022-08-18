import React from "react";

export default function Game(props){
    return(
        <div>
            <h1>Game</h1>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};