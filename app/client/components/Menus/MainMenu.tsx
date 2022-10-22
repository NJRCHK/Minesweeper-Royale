import * as React from 'react';
import SinglePlayerMenuButton from './SinglePlayerMenuButton';
import { Config, MainMenuProps } from '../../../shared/types';

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