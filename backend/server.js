// server.js

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: "secret_code",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secret_code"));
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pkmngame')
    .then(() => console.log('connected to database!'))
    .catch((err) => console.log(err.message));

const PORT = 3001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));