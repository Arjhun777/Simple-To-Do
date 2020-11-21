import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { emailValidator } from '../../../utils/helper';
import { loginService } from '../../../services/login.service';
// Style Imports
import '../../../assets/style/login.scss';

function Login(props:any) {
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
    const [validations, setValidation] = useState({ email: false, password: false });

    const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value, name } = event.target;
        checkValidation(name, value);
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    }
    
    const loginSubmitHandle = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const finalValidation = Object.values(validations).filter((value) => value)?.length;
        if (!finalValidation)
            loginService.login(loginDetails).then(() => {
                props.history.push('/home');
            });
    }

    const checkValidation = (name:string, value:string) => {
        if (name === 'email') setValidation({ ...validations, email: !emailValidator(value)});
    }

    return (
        <React.Fragment>
            <form id="login-form" onSubmit={loginSubmitHandle}>
                <TextField name="email" className="email" label="Email" type="text" value={loginDetails.email} onChange={handleFieldChange} helperText={validations.email && "Invalid Email"} error={validations.email}/>
                <TextField name="password" className="password" label="Password" type="password"  value={loginDetails.password} onChange={handleFieldChange}/>
                <Button className="login-btn" color="primary" type="submit">Login</Button>
            </form>
        </React.Fragment>
    )
}

export default Login;