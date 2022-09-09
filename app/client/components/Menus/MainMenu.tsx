import * as React from 'react';

type MainMenuProps = {
    handleClickMultiplayer: () => void
    handleClickSingleplayer: () => void
    handleClickLogin: () => void
}

export default function MainMenu(props: MainMenuProps) {
    return (
        <div>
            <div onClick={props.handleClickMultiplayer}>Play Multiplayer</div>
            <div onClick={props.handleClickSingleplayer}>Play Singleplayer</div>
            <div onClick={props.handleClickLogin}>Login</div>
        </div>
    );
};