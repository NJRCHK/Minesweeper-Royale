import * as React from 'react'
import { CreateAccountMenuProps } from '../../../shared/types';


export default function CreateAccountMenu(props: CreateAccountMenuProps) {
    console.log(props);
    return (
        <div className='create-account-menu-wrapper'>
            <div className='create-account-menu'>
                <text className='create-account-header'>Sign Up</text>
                <form className='create-account-form'>
                    <div className='flex-column'>
                        <label className='bold-text'>Username:</label>
                        <input type="text" name="username"className='create-account-input-box' />
                    </div>
                    <div className='flex-column'>
                        <label className='bold-text'>Password:</label>
                        <input type="password" name="password"className='create-account-input-box' />
                    </div>
                    <div className='flex-column'>
                        <label className='bold-text'>Confirm Password:</label>
                        <input type="password" name="confirmpassword" className='create-account-input-box' />
                    </div>
                    <input type="submit" value="Submit" className='create-account-form-submit-button'/>
                </form>
            </div>
        </div>
    )
}
