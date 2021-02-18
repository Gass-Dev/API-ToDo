// Imports
const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

require("express-async-errors");

const {
    BadRequestError,
    ConflictError,
    UnAuthorizedError,
    // ServerError,
    // NotFoundError
} = require("../helpers/errors");

// Regex
const USERNAME_REGEX = /^[a-zA-Z]{1,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

// Routes
module.exports = {
    getUserMe: async (req, res) => {
        let user = await models.User.findByPk(req.user.userId);
        res.status(200).json(user);
    },

    signup: async (req, res) => {
        // Params
        const {
            username,
            email,
            password
        } = req.body;

        if (!USERNAME_REGEX.test(username) === "") {
            throw new BadRequestError(
                "Bas request",
                "the username field is not fille in"
            );
        }

        if (!EMAIL_REGEX.test(email) === "") {
            throw new BadRequestError("Bad request", "Email invalid");
        }

        if (!PASSWORD_REGEX.test(password) === "") {
            throw new BadRequestError(
                "Bad request",
                "the invalid password: it must be 8 to 15 characters long and include at least 1 number, lowercase, uppercase"
            );
        }

        const userFound = await models.User.findOne({
            attributes: ["email"],
            where: {
                email
            },
        });

        if (!userFound) {
            const bcryptedPassword = await bcrypt.hash(password, 8);
            const newUser = await models.User.creat({
                username,
                email,
                password: bcryptedPassword
            });
            res.status(201).json(newUser);
        } else {
            throw new ConflictError("conflict error", "user already exists");
        }
    },

    login: async (req, res) => {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };

        if (user.email === "" || user.password === "") {
            throw new BadRequestError("Bad request", "please complete all fields");
        }

        const match = await models.User.findOne({
            where: {
                email: user.email,
            },
        });

        if (!match) {
            throw new UnAuthorizedError(
                "UnAuthorized access",
                "this mail does not exist"
            );
        }

        const resBcrypt = await bcrypt.compare(user.password, match.password);
        if (!resBcrypt) {
            throw new UnAuthorizedError("UnAuthorized access", "password invalid");
        }
        res.status(200).json({
            token: jwtUtils.generateTokenForUser(match),
            user: {
                username: match.username,
                email: match.email,
                id: match.id,
            },
        });
    },


};