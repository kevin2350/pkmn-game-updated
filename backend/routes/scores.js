// scores.js

const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Score = require('../models/score');

// get all saved scores
router.get('/', (req, res) => {
    Score.find()
        .then((scores) => res.json(scores))
        .catch((error) => res.status(400).json(error));
});

// add a new score to db
router.post('/add', (req, res) => {
    const player_name = req.body.player_name;
    const score = req.body.score;
    const ending_pkmn = req.body.ending_pkmn;
    const newScore = new Score({player_name, score, ending_pkmn});
    
    newScore.save()
        .then(() => res.json('Score saved'))
        .catch((error) => res.status(400).json(error));
});

// add a new score to db
router.post('/remove', (req, res) => {
    const id = new ObjectID(req.body.id);
    Score.deleteOne({_id: id})
    .then(res.json('Score deleted'));
});

module.exports = router;