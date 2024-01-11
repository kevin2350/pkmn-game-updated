// auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

router.post('/register', (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, async (error, user) => {
        if(error) throw error;
        if(user) res.send("user already exists");
        if(!user) {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hash
            });
            await newUser.save();
            res.send("success");
        }
    })
    
});


router.post('/login', (req, res,next) => {
    passport.authenticate('local', (error, user, info) => {
        if(error) throw error;
        if(!user) res.send("no user exists");
        else {
            req.logIn(user, error => {
                if(error) throw error;
                res.send('authenticated');
                console.log(req.user);
            });
        }
    })(req,res,next);
});

router.get('/user', (req, res) => {
    if(req.isAuthenticated()) {
        res.send(req.user.username);
    } else {
        res.send('unlogged');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;