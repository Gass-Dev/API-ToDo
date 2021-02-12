const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

// Routes
module.exports= {
    signup: (req,res) => {
        // Params
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        if (username == null || email == null || password == null ) {
            return res.status(400).json({error: "missing parameters"});
        }

        // Verify pseudo length, mail, regex, password etc.
        models.Users.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(password, 5, (err,cryptedPassword) => {
                    let newUser = models.Users.create({
                        username: username,
                        email: email,
                        password: cryptedPassword
                    })
                    .then((newUser) => {
                        return res.status(201).json({
                            userId: newUser.id,
                        })
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },

    login: (req,res) => {
        // Params
        let email = req.body.email;
        let password = req.body.password;
        
        if (email == null || password == null ) {
            return res.status(400).json({ error: 'missing parameters' });
        }
        // Verify pseudo length, mail, regex, password etc.
        models.Users.findOne({
            where: { email: email }
        })
        .then((userFound) => {
            if (userFound) {
                const json = JSON.parse(JSON.stringify(userFound))
                bcrypt.compare(password, json.password, (errBycrypt, resBycrypt) => {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': json.id,
                            'token': jwtUtils.generateTokenForUser(json)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'invalid password' });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB'});
            }
        })
        .catch((err) => {
            return res.status(500).json({ 'error': err });
        });
    }
};