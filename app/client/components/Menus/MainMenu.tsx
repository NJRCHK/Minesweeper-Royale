import * as React from 'react';
import SinglePlayerMenuButton from './SinglePlayerMenuButton';
import { MainMenuProps } from '../../../shared/types';

export default function MainMenu(props: MainMenuProps) {
    return (
        <div className='main-menu'>
            <div className='main-menu-subitem' onClick={props.handleClickMultiplayer}>Multiplayer</div>
            <div className='main-menu-divider'></div>
            <SinglePlayerMenuButton  startSinglePlayerGame={props.startSinglePlayerGame}/>
        </div>
    );
};
