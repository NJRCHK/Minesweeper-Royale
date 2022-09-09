import * as React from 'react';
import {useState} from 'react';

type Config = {
    height: number,
    width: number,
    mines: number,
}

type SinglePlayerMenu = {
    startSinglePlayerGame: (config: Config) => void
    handleClickBack: () => void
}

export default function SinglePlayerMenu(props: SinglePlayerMenu) {
    let defaultConfig = {
        height: 10,
        width: 10,
        mines: 20,
    };

    const [config, setConfig] = useState(defaultConfig);

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>): void => {
        setConfig(config => {
            return {
                ...config, 
                [event.target.name]: Number(event.target.value),
            }
        });
    };

    const onSubmit = (event:  React.SyntheticEvent): void => {
        event.preventDefault();
        props.startSinglePlayerGame(config);
    };

    return (
        <div>
            <h1>Single Player Menu</h1>
            <form onSubmit={onSubmit}>
                <input name="height" value={config.height} onChange={handleChange}type="range" min="6" max="40"></input>
                <input name="width" value={config.width} onChange={handleChange} type="range" min="6" max="40"></input>
                <input name="mines" value={config.mines} onChange={handleChange} type="range" min="6" max="40"></input>
                <button>Start Game</button>
            </form>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};