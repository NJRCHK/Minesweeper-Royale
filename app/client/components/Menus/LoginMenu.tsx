import * as React from 'react'
import { useState, useRef } from 'react'; 
import { AccountMenuProps } from '../../../shared/types';



export default function CreateAccountMenu(props: AccountMenuProps) {

    const usernameContainer = useRef<HTMLInputElement>(null);;
    const passwordContainer = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setErrorMessage("");
        if(usernameContainer.current === null ||
           passwordContainer.current === null 
            ){
             return;
         }
        if(usernameContainer.current.value === null ||
           passwordContainer.current.value === null 
           ){
            return;
        }
        const username = usernameContainer.current.value;
        const password = passwordContainer.current.value;

        if (username.length === 0){
            setErrorMessage("Username field cannot be blank");
            return;
        }
        else if (password.length === 0){
            setErrorMessage("Password field cannot be blank");
        }

        const data = {
            username: username,
            password: password,
        }

        const response = await fetch('./api/login', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        });
        if(response.status !== 200){
            setErrorMessage("An error occurred. Please try again.");
            return;
        }
        props.updateAccountStatus(true, username);
        props.closeView();
    }
    
    return (
        <div className='account-menu-wrapper' onClick={props.closeView}>
            <div className='account-menu'>
                <button className='account-close-menu-button'>X</button>
                <div className='account-header'>Login</div>
                <form className='account-form' onSubmit={onSubmit}>
                    <div className='flex-column-account'>
                        <label className='bold-text'>Username:</label>
                        <input type="text" name="username"className='account-input-box' ref={usernameContainer}/>
                    </div>
                    <div className='flex-column-account'>
                        <div className='flex-column-account'>
                            <label className='bold-text'>Password:</label>
                            <input type="password" name="password"className='account-input-box' ref={passwordContainer}/>
                        </div>
                    </div>
                    <input type="submit" value="Submit" className='account-form-submit-button'/>
                </form>
                <div className='account-error-text'>{errorMessage}</div>
            </div>
        </div>
    )
}
