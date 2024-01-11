// Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

const Home = () => {
    const [status, setStatus] = useState('Play as Guest');
    const [logged, setLogged] = useState('LoggedOut');
    const [showLogout, setShowLogout] = useState('LogoutFalse');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const goToHelp = (evt) => {
        evt.preventDefault();
        navigate('/help');
    }

    const goToScores = (evt) => {
        evt.preventDefault();
        navigate('/scores');
    }

    const goToLogin = (evt) => {
        evt.preventDefault();
        navigate('/login');
    }

    const goToRegister = (evt) => {
        evt.preventDefault();
        navigate('/register');
    }

    const startGame = (evt) => {
        evt.preventDefault();
        navigate('/play');
    }

    const goToLB = (evt) => {
        evt.preventDefault();
        navigate('/leaderboard');
    }

    const log = (evt) => {
        evt.preventDefault();
        axios.get("http://localhost:3001/auth/user", { withCredentials: true })
            .then((user) => {
                const status = user.data;
                if(status !== 'unlogged') {
                    axios.get("http://localhost:3001/auth/logout", { withCredentials: true })
                        .then((res) => {
                            setStatus(`Play as Guest`);
                            setLogged('LoggedOut');
                            setShowLogout('LogoutFalse');
                            setUsername('');
                        })
                        .catch((error) => console.log(error));
                } else {
                    navigate('/login');
                }
            }).catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get("http://localhost:3001/auth/user", { withCredentials: true })
            .then((user) => {
                const status = user.data;
                if(status !== 'unlogged') {
                    setStatus(`Play as -${status}-`);
                    setLogged('LoggedIn');
                    setShowLogout('LogoutTrue');
                    setUsername(status);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="home">
                <h1 className="homeTitle">Guess the Pokemon!</h1>
                <form onSubmit={startGame}>
                    <input type="submit" className="menus" value={status} name=""/>
                </form>
                <form onSubmit={goToHelp}>
                    <input type="submit" className="menus" value="How to Play?" name=""/>
                </form>
                <form onSubmit={goToLB}>
                    <input type="submit" className="menus" value="Leaderboard" name=""/>
                </form>
                <form className="myScores "onSubmit={goToScores}>
                    <input type="submit" className="menus" value="My Scores" name=""/>
                </form>
                <div className={logged}>
                    <p>To view and save scores, you must be <span className="loginHere" onClick={goToLogin}>Logged In</span></p>
                    <p>Don't have an account? <span className="loginHere" onClick={goToRegister}>Register Here</span></p>
                </div>
                <div className={showLogout}>
                    <p><span className="loginHere" onClick={log}>Logout</span></p>
                </div>
            </div>
        </>
    );
}

export default Home;
