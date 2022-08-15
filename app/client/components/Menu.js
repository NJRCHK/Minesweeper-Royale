import React from 'react';
import SinglePlayerMenu from './Menus/SinglePlayerMenu.js';
import MainMenu from './Menus/MainMenu.js';

export default function Menu(props){
    function renderSwitch(menuType){
        switch(menuType){
            case "main":
                return <MainMenu />;
            case "singlePlayer":
                return <SinglePlayerMenu />
        }
    }
    console.log(props);
    return (
        <div>
            {renderSwitch(props.menuType)}
        </div>
    );
}