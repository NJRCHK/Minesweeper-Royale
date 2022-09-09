import * as React from 'react';

type LoginProps = {
    handleClickBack: () => void
}

export default function Login(props: LoginProps){
    return (
        <div>
            <div>Login</div>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
}