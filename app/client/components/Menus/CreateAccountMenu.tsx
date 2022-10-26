import * as React from 'react'
import { useState, useRef } from 'react'; 
import { CreateAccountMenuProps } from '../../../shared/types';



export default function CreateAccountMenu(props: CreateAccountMenuProps) {

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
            console.log(password);
            console.log(hasNumber(password));
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
    }
    
    console.log(props);
    return (
        <div className='create-account-menu-wrapper'>
            <div className='create-account-menu'>
                <div className='create-account-header'>Sign Up</div>
                <form className='create-account-form' onSubmit={onSubmit}>
                    <div className='flex-column-create-account'>
                        <label className='bold-text'>Username:</label>
                        <input type="text" name="username"className='create-account-input-box' ref={usernameContainer}/>
                    </div>
                    <div className='flex-column-create-account'>
                        <div className='flex-column-create-account'>
                            <label className='bold-text'>Password:</label>
                            <input type="password" name="password"className='create-account-input-box' ref={passwordContainer}/>
                        </div>
                        <div className='create-account-password-subtext'>Password must contain at least 8 characters, 1 number and 1 letter</div>
                    </div>
                    <div className='flex-column-create-account'>
                        <label className='bold-text'>Confirm Password:</label>
                        <input type="password" name="confirmpassword" className='create-account-input-box' ref={confirmPasswordContainer}/>
                    </div>
                    <input type="submit" value="Submit" className='create-account-form-submit-button'/>
                </form>
                <div className='create-account-error-text'>{errorMessage}</div>
            </div>
        </div>
    )
}
