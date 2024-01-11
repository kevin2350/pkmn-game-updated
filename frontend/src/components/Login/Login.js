// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('goodLogin');

    const navigate = useNavigate();

    const goToRegister = (evt) => {
        evt.preventDefault();
        navigate('/register');
    }

    const goToHome = (evt) => {
        evt.preventDefault();
        navigate('/');
    }
    
    const login = (evt) => {
        evt.preventDefault();
        axios.post("http://localhost:3001/auth/login", {username, password}, { withCredentials: true })
            .then((user) => {
                const status = user.data;
                if(status === 'authenticated') {
                    navigate('/');
                } else {
                    setLoginError('badLogin');
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <div className="login">
                <h1>LOGIN</h1>
                <div>
                    <input className="loginInput" type="text" name="loginUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}/>
                </div>
                <div>
                    <input className="loginInput" type="password" name="loginPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}/>
                </div>
                <div className={loginError}>
                    <p>Could not sign in. Please try again.</p>
                </div>
                <button className="loginSubmit" type="submit" onClick={login}>Submit</button>
                <p>Don't have an account? <span className="registerHere" onClick={goToRegister}>Register Here</span></p>
                <p>or <span className="registerHere" onClick={goToHome}>Continue as Guest</span></p>
            </div>
        </>
    );
}

export default Login;
