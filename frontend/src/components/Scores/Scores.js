// Scores.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Scores.css'

const Scores = () => {
    const [scores, setScores] = useState([]);
    const [username, setUsername] = useState('');
    const [logged, setLogged] = useState('Unlogged');
    const [action, setAction] = useState('Login');
    const [showError, setShowError] = useState('yesError');
    const [showProfile, setShowProfile] = useState('noShow');

    const navigate = useNavigate();

    const goToHome = (evt) => {
        evt.preventDefault();
        navigate('/');
    }

    const log = (evt) => {
        evt.preventDefault();
        axios.get("http://localhost:3001/auth/user", { withCredentials: true })
            .then((user) => {
                const status = user.data;
                if(status !== 'unlogged') {
                    axios.get("http://localhost:3001/auth/logout", { withCredentials: true })
                        .then((res) => {
                            setLogged('Unlogged');
                            setAction('Login');
                            setUsername('');
                            setShowProfile('noShow');
                            setShowError('yesError');
                            navigate('/');
                        })
                        .catch((error) => console.log(error));
                } else {
                    navigate('/login');
                }
            }).catch((error) => console.log(error));
    }

    const removeEntry = (evt) => {
        evt.preventDefault();
        axios.post("http://localhost:3001/scores/remove", {id: scores[evt.target.value].id})
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));

        const arr = scores.slice(0);
        arr.splice(evt.target.value, 1);
        setScores(arr);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/auth/user", { withCredentials: true })
            .then((user) => {
                const name = user.data;
                if(name !== 'unlogged') {
                    setLogged('Logged');
                    setAction('Logout');
                    setUsername(name);
                    setShowProfile('yesShow');
                    setShowError('noError');

                    axios.get("http://localhost:3001/scores")
                        .then((res) => {
                            const data = res.data;
                            data.map((score) => {
                                if(score.player_name === name) {
                                    const entry = {id: score._id, player_name: score.player_name, score: score.score, ending_pkmn: score.ending_pkmn};
                                    setScores(scores => [...scores, entry]);
                                }
                            });
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }, []);
    
    return (
        <>
            <div className="scores">
                <p><span className="loginHere" onClick={log}>{action}</span></p>
                <form onSubmit={goToHome}>
                    <input type="submit" className="btn" value="Back to Menu" name=""/>
                </form>
                <div className={showError}>
                    <h1 className="scoresTitle">SCORES</h1>
                    <p>You must be logged in to save past game scores.</p>
                </div>
                <div className={showProfile}>
                    <h1 className="scoresTitle">{username}'s SCORES</h1>
                    <div className={logged}>
                        {scores.map((score, i) => 
                            <div className="savedEntry" key={i}> 
                                <div className="entryScore">Score: {score.score}</div> 
                                <img className="entryImg" src={score.ending_pkmn}/>
                                <button id="entryBtn" value={i} onClick={removeEntry}>Remove</button>
                            </div>)} 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Scores;
