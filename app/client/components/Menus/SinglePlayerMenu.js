import React from 'react';

export default function SinglePlayerMenu(props) {
    return (
        <div>
            <h1>Single Player Menu</h1>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
};