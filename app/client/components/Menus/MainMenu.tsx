import * as React from 'react';
import SinglePlayerMenuButton from './SinglePlayerMenuButton';

type Config = {
    height: number,
    width: number,
    mines: number
};

type MainMenuProps = {
    handleClickMultiplayer: () => void;
    handleClickSingleplayer: () => void;
    handleClickLogin: () => void;
    startSinglePlayerGame: (arg0: Config) => void;
};

export default function MainMenu(props: MainMenuProps) {
    return (
        <div className='main-menu'>
            <div className='main-menu-header'>
                <div className='main-menu-header-header'>Minesweeper</div>
                <div className='main-menu-header-subheader'>Royale</div>
            </div>
            <div onClick={props.handleClickMultiplayer}>Multiplayer</div>
            <SinglePlayerMenuButton startSinglePlayerGame={props.startSinglePlayerGame}/>
            <div onClick={props.handleClickLogin}>Login</div>
        </div>
    );
};