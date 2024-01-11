// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Help from './components/Help/Help';
import Play from './components/Play/Play';
import Scores from './components/Scores/Scores';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element = {<Home/>}/>
                    <Route path='/help' element = {<Help/>}/>
                    <Route path='/play' element = {<Play/>}/>
                    <Route path='/scores' element = {<Scores/>}/>
                    <Route path='/Register' element = {<Register/>}/>
                    <Route path='/Login' element = {<Login/>}/>
                    <Route path='/Leaderboard' element = {<Leaderboard/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;