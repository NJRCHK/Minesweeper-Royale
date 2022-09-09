import * as React from 'react';
import {useState} from 'react';
import MainMenu from './Menus/MainMenu';
import SinglePlayerMenu from './Menus/SinglePlayerMenu';
import Game from '../components/Game';
import SinglePlayerGame from '../components/SinglePlayerGame';
import Login from './Login'

type Config = {
    height: number,
    width: number,
    mines: number
}

const defaultConfig: Config = {
    height: 20,
    width: 20,
    mines: 20,
}

export default function App() {
    const [mode, setMode] = useState('MainMenu');
    const [config, setConfig] = useState(defaultConfig);
    function renderSwitch(mode: string){
        switch(mode){
            case 'MainMenu':
                return <MainMenu 
                    handleClickMultiplayer={() => setMode('Game')} 
                    handleClickSingleplayer={() => setMode('SinglePlayerMenu')}
                    handleClickLogin={() => setMode('Login')}
                />;
            case 'SinglePlayerMenu':
                return <SinglePlayerMenu 
                    startSinglePlayerGame={config => {
                        setMode('SinglePlayerGame')
                        setConfig(config);
                    }}
                    handleClickBack={() => setMode('MainMenu')}
                />
            case 'Game':
                return <Game 
                    handleClickBack={() => setMode('MainMenu')}
                />
            case 'SinglePlayerGame':
                return <SinglePlayerGame 
                    config={config}
                />
            case 'Login':
                return <Login 
                    handleClickBack={() => setMode('MainMenu')}
                />
            default:
                return <h1>An Error Occurred</h1>;
        }
    }

    return (
        <div>{renderSwitch(mode)}</div>
    );
};