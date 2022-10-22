import * as React from 'react';
import {useState} from 'react';
import { Config, SinglePlayerMenuButtonProps } from '../../../shared/types';

export default function SinglePlayerMenuButton(props: SinglePlayerMenuButtonProps) {

    const [optionsShown, setOptionsShown] = useState(false);

    const beginnerConfig: Config = {
        height: 9,
        width: 9,
        mines: 10,
    };

    const intermediateConfig: Config = {
        height: 16, 
        width: 16,
        mines: 40,
    };

    const expertConfig: Config = {
        height: 20,
        width: 32,
        mines: 99,
    };
    function showSubMenu(): void {
        setOptionsShown(optionsShown => !optionsShown);
    }

    return (
        <div>
            <div onClick={showSubMenu}>Single Player</div>
            {optionsShown &&         
                <div>
                <button onClick={() => {props.startSinglePlayerGame(beginnerConfig)}}>Beginner</button>
                <button onClick={() => {props.startSinglePlayerGame(intermediateConfig)}}>Intermediate</button>
                <button onClick={() => {props.startSinglePlayerGame(expertConfig)}}>Expert</button>
            </div>}
        </div>
    )
}