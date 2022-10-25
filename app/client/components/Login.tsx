import * as React from 'react';
import { LoginProps } from '../../shared/types';

export default function Login(props: LoginProps){
    return (
        <div>
            <div>Login</div>
            <div onClick={props.handleClickBack}>Back</div>
        </div>
    );
}
