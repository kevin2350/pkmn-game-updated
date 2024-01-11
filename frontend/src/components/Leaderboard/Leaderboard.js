// Leaderboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css'

const Leaderboard = () => {
    const [top, setTop] = useState([]);

    const navigate = useNavigate();

    const goToHome = (evt) => {
        evt.preventDefault();
        navigate('/');
    }

    useEffect(() => {
        axios.get("http://localhost:3001/scores")
            .then((res) => {
            const data = res.data;
            const copy = data.slice();
            function compare( a, b ) {
                if ( a.score > b.score ){
                  return -1;
                }
                if ( a.score < b.score ){
                  return 1;
                }
                return 0;
              }
              
            copy.sort( compare );
            for(let i = copy.length; i < 5; i++) {
                copy.push({score: 0, player_name: 'no user', ending_pkmn: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'});
            }
            setTop([copy[0], copy[1], copy[2], copy[3], copy[4]]);
            }).catch((error) => console.log(error));
        }, []);
    
    return (
        <>
            <div className="scores">
                <form onSubmit={goToHome}>
                    <input type="submit" className="btn" value="Back to Menu" name=""/>
                </form>
                <div>
                    <h1 className="scoresTitle">LEADERBOARD</h1>
                    <div className="True">
                        {top.map((score, i) => 
                            <div className="lbEntry" key={i}> 
                                <div className="lbText">{score.player_name}</div>
                                <div className="lbText">Score: {score.score}</div> 
                                <img className="lbImg" src={score.ending_pkmn}/>
                            </div>)} 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;
