import React, {useState} from 'react';

export default function SinglePlayerMenu(props) {
    let defaultConfig = {
        height: 10,
        width: 10,
        mines: 20,
    };

    const [config, setConfig] = useState(defaultConfig);

    const handleChange = event => {
        setConfig(config => {
            return {
                ...config, 
                [event.target.name]: Number(event.target.value),
            }
        });
    };

    const onSubmit = event => {
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