// Home.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Play.css'

const Play = () => {
    const [round, setRound] = useState(0);
    const [sprite, setSprite] = useState('');
    const [hidden, setHidden] = useState('Hidden');
    const [name, setName] = useState('name');
    const [pkmn, setPkmn] = useState(['type', 'ability', 'weight']);
    const [desc, setDesc] = useState('');
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('None');
    const [next, setNext] = useState('None');
    const [save, setSave] = useState('None');
    const [submit, setSubmit] = useState('submit');

    const navigate = useNavigate();

    const goToSave = (evt) => {
        evt.preventDefault();

        axios.get("http://localhost:3001/auth/user", { withCredentials: true })
            .then((user) => {
                const name = user.data;
                if(name !== 'unlogged') {
                    const newScore = {
                        player_name: name,
                        score: round,
                        ending_pkmn: sprite
                    };
                    axios.post("http://localhost:3001/scores/add", newScore)
                        .then((res) => {
                            console.log(res.data);
                            navigate('/scores');
                        })
                        .catch((error) => console.log(error));
                } else {
                    navigate('/login');
                }
            }).catch((error) => console.log(error));
    }
    
    // get pokemon from api
    const generatePkmn = async () => {
        const id = Math.floor(Math.random() * 493) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pkmnApi = await axios.get(url);
        const pokemon = pkmnApi.data;
        
        // show sprite
        setSprite(pokemon.sprites.front_default);
                
        // get type(s)
        let type = 'Type:';
        const types = pokemon.types;
        types.map((t) => { 
            const typeProper = t.type.name[0].toUpperCase() + t.type.name.slice(1);
            type = type.concat(' ', `[${typeProper}]`);
        });

        // get ability(s)
        let ability = 'Ability:';
        const abilities = pokemon.abilities;
        abilities.map((a) => { 
            const abilityProper = a.ability.name[0].toUpperCase() + a.ability.name.slice(1);
            ability = ability.concat(' ', `[${abilityProper}]`);
        });

        // get weight
        const weight = `Weight: ${pokemon.weight/10} kg`;

        // get name
        const nameProper = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        setName(nameProper);
        setPkmn([type, ability, weight]);
                
        // get description
        const descApi = await axios.get(pokemon.species.url);
        const data = descApi.data;

        const entries = data.flavor_text_entries;
        let found = false;
        entries.map((d) => {
            if(d.language.name === 'en' && !found) {
                let entry = d.flavor_text;
                entry = entry.replace(new RegExp(pokemon.name, "gi"), "THIS POKéMON");
                entry = entry.replaceAll('\f', ' ');
                console.log('answer: ', pokemon.name);
                setDesc(entry);
                found = true;
            } 
        });   
    }

    const nextRound = async () => {
        setResult('None');
        setSubmit('submit');
        setHidden('Hidden');
        if(next === 'Restart') {
            setRound(0);
            setNext('None');
            navigate('/');
        } else {
            setNext('None');
            generatePkmn();
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSubmit('None');
        setHidden('NotHidden');

        if(guess.toLowerCase() === name.toLowerCase()) {
            setResult('Correct');
            setNext('Continue');
            setSave('None');
            setRound(round+1);
        } else {
            setResult('Incorrect');
            setNext('Restart');
            setSave('Save');
        }
        setGuess('');
    }

    useEffect(() => {
        generatePkmn();
    }, []);

    return (
        <>
            <div className="round">
                <h3>Score: <span className="roundNum">{round}</span></h3>
            </div>
            <div className="play">
                <div className="traits">
                    <img src={sprite} className={hidden}/>
                    {pkmn.map((trait) => <div key={trait}> {trait} </div>)} 
                </div>
                <div className="desc">
                    {desc}
                </div>
                <div className={submit}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input className="ans" type="text" value={guess} placeholder="Enter guess..." onChange={(e)=> {setGuess(e.target.value.replace(/\s/g, ""))}}/>
                        </label>
                        <button className="ans" type="submit">Submit</button>
                    </form>
                </div>
                <div className={result}>
                    <h3>{result}!</h3>
                    <p id="pkmnWas">The POKéMON was {name}</p>
                </div>
                <button className={next} onClick={nextRound}>{next}</button>
                <button className={save} onClick={goToSave}>Save Score</button>
            </div>
        </>
    );
}

export default Play;