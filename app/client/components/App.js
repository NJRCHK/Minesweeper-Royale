import React, {useState} from 'react';
import MainMenu from './Menus/MainMenu.js';
import SinglePlayerMenu from './Menus/SinglePlayerMenu.js';
import Game from '../components/Game.js';
import Login from './Login.js'

export default function App() {
    const [mode, setMode] = useState('MainMenu');
    function renderSwitch(mode){
        switch(mode){
            case 'MainMenu':
                return <MainMenu 
                    handleClickMultiplayer={() => setMode('Game')} 
                    handleClickSingleplayer={() => setMode('SinglePlayerMenu')}
                    handleClickLogin={() => setMode('Login')}
                />;
            case 'SinglePlayerMenu':
                return <SinglePlayerMenu 
                    handleClickBack={() => setMode('MainMenu')}
                />
            case 'Game':
                return <Game 
                    handleClickBack={() => setMode('MainMenu')}
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