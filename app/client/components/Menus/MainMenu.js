import React from 'react';

export default function MainMenu(props) {
    return (
        <div>
            <div onClick={props.handleClickMultiplayer}>Play Multiplayer</div>
            <div onClick={props.handleClickSingleplayer}>Play Singleplayer</div>
            <div onClick={props.handleClickLogin}>Login</div>
        </div>
    );
};