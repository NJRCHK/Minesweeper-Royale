import * as React from 'react';
import {useState} from 'react';
import { Config, SinglePlayerMenuButtonProps } from '../../../shared/types';
import {BEGINNERCONFIG, INTERMEDIATECONFIG, EXPERTCONFIG} from '../../../shared/constants';

export default function SinglePlayerMenuButton(props: SinglePlayerMenuButtonProps) {

    const [optionsShown, setOptionsShown] = useState(false);

    function showSubMenu(): void {
        if(optionsShown === true){
            return;
        }
        setOptionsShown(optionsShown => !optionsShown);
    }
    function hideSubMenu() {
        setOptionsShown(false);
    }

    return (
        <div onClick={showSubMenu} onMouseLeave={hideSubMenu} className='main-menu-subitem'>
            <div>
                {!optionsShown && <div>Singleplayer</div>}
                {optionsShown &&         
                <div>
                    <button className='singleplayer-submenu-button blue-text' onClick={() => {props.startSinglePlayerGame(BEGINNERCONFIG)}}>Beginner</button>
                    <button className='singleplayer-submenu-button green-text' onClick={() => {props.startSinglePlayerGame(INTERMEDIATECONFIG)}}>Intermediate</button>
                    <button className='singleplayer-submenu-button red-text' onClick={() => {props.startSinglePlayerGame(EXPERTCONFIG)}}>Expert</button>
                </div>
                }
            </div>
        </div>
    )
}
