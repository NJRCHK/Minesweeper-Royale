import * as React from 'react';
import {useState, useEffect} from 'react';
import MainMenu from './Menus/MainMenu';
import Game from '../components/Game';
import SinglePlayerGame from '../components/SinglePlayerGame';
import Header from './Header';
import { Config, AppStates, UserSession } from '../../shared/types';

const defaultConfig: Config = {
    height: 16,
    width: 16,
    mines: 40,
}

export default function App() {
    const [accountDetails, setAccountDetails] = useState({
        username: "",
        loggedIn: false,
    } as UserSession);

    const [mode, setMode] = useState(AppStates.MAINMENU);
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        fetch("/api/isLoggedIn")
            .then((response) => response.json())
            .then(data => setAccountDetails({
                username: data.username,
                loggedIn: true
            }))
            .catch(() => {
                setAccountDetails({
                    username: "",
                    loggedIn: false
                });
            });
    }, []);

    function updateAccountStatus(loggedIn: boolean, username: string) {
        setAccountDetails({
            loggedIn: loggedIn,
            username: username
        } as UserSession);
    }

    function renderSwitch(mode: AppStates){
        switch(mode){
            case AppStates.MAINMENU:
                return <MainMenu 
                    handleClickMultiplayer={() => setMode(AppStates.MULTIPLAYERGAME)} 
                    handleClickSingleplayer={() => setMode(AppStates.MULTIPLAYERGAME)}
                    startSinglePlayerGame={config => {
                        setConfig(config);
                        setMode(AppStates.SINGLEPLAYERGAME);
                    }}
                />
            case AppStates.MULTIPLAYERGAME:
                return <Game account={accountDetails}/>
            case AppStates.SINGLEPLAYERGAME:
                return <SinglePlayerGame 
                    config={config}
                />
            default:
                return <h1>An Error Occurred</h1>;
        }
    }

    function returnToHomeScreen() {
        if(mode === AppStates.MAINMENU){
            window.location.reload();
        }
        else {
            setMode(AppStates.MAINMENU);            
        }
    }

    return (
        <div className='wrapper'>
            <Header returnToHomeScreen={returnToHomeScreen} updateAccountStatus={updateAccountStatus} loggedIn={accountDetails.loggedIn}/>
            <div className='app-wrapper'>{renderSwitch(mode)}</div>
        </div>
    );
};
