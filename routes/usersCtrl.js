const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                            userid: newUser.id,
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
        
        if (email == null || password == null )
        {
            return res.status(400).json({
                error: 'missing parameters'
            });
        }
    }
} 