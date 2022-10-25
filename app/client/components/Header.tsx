import * as React from 'react';
import { HeaderProps } from '../../shared/types';

export default function (props: HeaderProps) {
    console.log(props);
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
                    <button className='login-button'>
                        Login
                    </button>
                    <button className='create-account-button'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
