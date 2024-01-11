// Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('goodRegister');

    const navigate = useNavigate();

    const goToLogin = (evt) => {
        evt.preventDefault();
        navigate('/login');
    }

    const goToHome = (evt) => {
        evt.preventDefault();
        navigate('/');
    }
    
    const register = (evt) => {
        evt.preventDefault();
        if(username.trim() === '' || password.trim() === '') {
            setRegisterError('badLogin');
        } else {
            axios.post("http://localhost:3001/auth/register", {username, password}, { withCredentials: true })
            .then((user) => {
                const status = user.data;
                if(status === 'success') {
                    axios.post("http://localhost:3001/auth/login", {username, password}, { withCredentials: true })
                        .then(() => navigate('/'));
                } else {
                    setRegisterError('badLogin');
                }
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <>
            <div className="register">
                <h1>REGISTER</h1>
                <div>
                    <input className="registerInput" type="text" name="registerUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}/>
                </div>
                <div>
                    <input className="registerInput" type="password" name="registerPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}/>
                </div>
                <div className={registerError}>
                    <p>Could not register. Try a different username.</p>
                </div>
                <button className="registerSubmit" type="submit" onClick={register}>Submit</button>
                <p>Already have an account? <span className="loginHere" onClick={goToLogin}>Login</span></p>
                <p>or <span className="loginHere" onClick={goToHome}>Continue as Guest</span></p>
            </div>
        </>
    );
}

export default Register;
