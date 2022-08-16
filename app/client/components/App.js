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
                return <SinglePlayerMenu />
            case 'Game':
                return <Game />
            case 'Login':
                return <Login />
            default:
                return <h1>An Error Occurred</h1>;
        }
    }

    return (
        <div>{renderSwitch(mode)}</div>
    );
};