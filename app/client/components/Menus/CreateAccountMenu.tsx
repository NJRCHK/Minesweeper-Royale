import * as React from 'react'
import { useState, useRef } from 'react'; 
import { AccountMenuProps } from '../../../shared/types';



export default function CreateAccountMenu(props: AccountMenuProps) {

    const usernameContainer = useRef<HTMLInputElement>(null);;
    const passwordContainer = useRef<HTMLInputElement>(null);
    const confirmPasswordContainer = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");

    function hasNumber(string: string) {
        return /\d/.test(string);
    }

    function hasLetter(string: string){
        return /\w/.test(string);
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setErrorMessage("");
        if(usernameContainer.current === null ||
           passwordContainer.current === null ||
           confirmPasswordContainer.current === null
            ){
             return;
         }
        if(usernameContainer.current.value === null ||
           passwordContainer.current.value === null ||
           confirmPasswordContainer.current.value === null
           ){
            return;
        }
        const username = usernameContainer.current.value;
        const password = passwordContainer.current.value;
        const confirmPassword = confirmPasswordContainer.current.value;

        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match");
            return;
        } 
        else if (username.length === 0){
            setErrorMessage("Username field cannot be blank");
            return;
        }
        else if (password.length < 8 || !hasLetter(password) || !hasNumber(password)){
            setErrorMessage("Password does not match requirements");
            return;
        }
        
        const data = {
            username: username,
            password: password,
        }

        const response = await fetch('./api/createAccount', {
            method:'POST',
            credentials: 'same-origin',
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
                <div className='account-header'>Sign Up</div>
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
                        <div className='account-password-subtext'>Password must contain at least 8 characters, 1 number and 1 letter</div>
                    </div>
                    <div className='flex-column-account'>
                        <label className='bold-text'>Confirm Password:</label>
                        <input type="password" name="confirmpassword" className='account-input-box' ref={confirmPasswordContainer}/>
                    </div>
                    <input type="submit" value="Submit" className='account-form-submit-button'/>
                </form>
                <div className='account-error-text'>{errorMessage}</div>
            </div>
        </div>
    )
}
