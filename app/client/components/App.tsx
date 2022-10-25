import * as React from 'react';
import {useState} from 'react';
import MainMenu from './Menus/MainMenu';
import Game from '../components/Game';
import SinglePlayerGame from '../components/SinglePlayerGame';
import Header from './Header';
import { Config, AppStates } from '../../shared/types';

const defaultConfig: Config = {
    height: 20,
    width: 20,
    mines: 20,
}

export default function App() {
    const [mode, setMode] = useState(AppStates.MAINMENU);
    const [config, setConfig] = useState(defaultConfig);
    function renderSwitch(mode: AppStates){
        switch(mode){
            case AppStates.MAINMENU:
                return <MainMenu 
                    handleClickMultiplayer={() => setMode(AppStates.MULTIPLAYERGAME)} 
                    handleClickSingleplayer={() => setMode(AppStates.MULTIPLAYERGAME)}
                    startSinglePlayerGame={config => {
                        setConfig(config);
                        setMode(AppStates.SINGLEPLAYERMENU);
                    }}
                />
            case AppStates.MULTIPLAYERGAME:
                return <Game />
            case AppStates.SINGLEPLAYERGAME:
                return <SinglePlayerGame 
                    config={config}
                />
            default:
                return <h1>An Error Occurred</h1>;
        }
    }

    return (
        <div className='wrapper'>
            <Header />
            <div className='app-wrapper'>{renderSwitch(mode)}</div>
        </div>
    );
};
