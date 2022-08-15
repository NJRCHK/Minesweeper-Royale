import React, {useState} from 'react';
import Menu from '../components/Menu.js';
import Game from '../components/Game.js';

export default function App() {
    const [mode, setMode] = useState('MainMenu');

    function renderSwitch(mode){
        switch(mode){
            case 'MainMenu':
                return <Menu menuType="main" multiplayerClickEvent={()=>setMode("Game")} singlePlayerClickEvent={()=>setMode("SinglePlayerMenu")}/>;
            case 'Game':
                return <Game />
            default:
                return <h1>An Error Occurred</h1>;
        }
    }

    return (
        <div>{renderSwitch(mode)}</div>
    );
};