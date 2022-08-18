import React from 'react';

export default function Login(props){
    return (
        <div>
            <div>Login</div>
            <div onClick={props.handleClickBack}>Back</div>
        </div>

    );
}