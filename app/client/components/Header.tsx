import * as React from 'react';
import { useState } from 'react';
import { HeaderProps, HeaderStates } from '../../shared/types';
import CreateAccountMenu from './Menus/CreateAccountMenu';
import LoginMenu from './Menus/LoginMenu';

export default function (props: HeaderProps) {
    const [shownScreen, setShownScreen] = useState(HeaderStates.DEFAULT);

    console.log(props);
    function renderLoginScreen() {
        setShownScreen(HeaderStates.LOGIN);
    }

    function renderCreateAccountScreen() {
        setShownScreen(HeaderStates.CREATEACCOUNT);
    }

    function closeView(event?: React.SyntheticEvent) {
        if(event === undefined){
            setShownScreen(HeaderStates.DEFAULT);
            return;
        }

        let eventClassName = (event.target as HTMLElement).className;
        let backgroundClass = 'create-account-menu-wrapper';
        let closeButtonClass = 'create-account-close-menu-button';
        //Only close the view if the close button or the background was clicked
        if([backgroundClass, closeButtonClass].includes(eventClassName)){
            setShownScreen(HeaderStates.DEFAULT);
        }
    }

    return(
        <div className='header'>
            <div className='header-content-wrapper'>
                <div className='game-title'>
                    <div className='game-title-minesweeper'>
                        Minesweeper
                    </div>
                    <div className='game-title-royale'>
                        Royale
                    </div>
                </div>
                <div className='header-content-rightjustified-wrapper'>
                    <button className='login-button' onClick={renderLoginScreen}>
                        Login
                    </button>
                    <button className='create-account-button' onClick={renderCreateAccountScreen}>
                        Sign Up
                    </button>
                </div>
            </div>
            {(shownScreen === HeaderStates.CREATEACCOUNT) && <CreateAccountMenu closeView={closeView}/>}
            {(shownScreen === HeaderStates.LOGIN) && <LoginMenu closeView={closeView}/>}
        </div>
    );
}
