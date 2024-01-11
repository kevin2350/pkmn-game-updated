// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Help.css'

const Help = () => {
    const navigate = useNavigate();

    const goToHome = (evt) => {
        evt.preventDefault();
        navigate('/');
    }

    return (
        <>
            <div className="help">
                <h1>How to Play</h1>
                <p>This is a round-based game</p>
                <p>At the start of each round, you'll be presented an unknown Pokemon</p>
                <p>With the hints given, guess the Pokemon's name</p>
                <form onSubmit={goToHome}>
                    <input type="submit" id="goToHome" value="Back to Start" name=""/>
                </form>
            </div>
        </>
    );
}

export default Help;
