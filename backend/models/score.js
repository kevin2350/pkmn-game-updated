// score.js (schema for saved scores)

const mongoose = require('mongoose');

const scoreSchema =  mongoose.Schema({
	player_name: {type: String, required: true},
	score: {type: Number, required: true},
	ending_pkmn: {type: String, required: true}
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;