// Imports
const jwt = require('jsonwebtoken');
const {
    UnAuthorizedError,
    BadRequestError
} = require('../helpers/errors');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Authorize / Secure Token
const parseAuth = (authorization) => {
    const token = authorization.replace('Bearer', "");
    if (token === null || token == "") {
        throw new UnAuthorizedError('Unauthorized access', 'No token Found');
    }
    return token;
};

// Generate Token
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
                userId: userData.id,
            },
            JWT_SECRET, {
                expiresIn: "4h",
            }
        );
    },
};

// Verify Token
authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                throw new UnAuthorizedError(
                    'Access denied',
                    "You must be logged in to access this page"
                );
            }
            req.user = user;
            next();
            });
    } else {
        throw new BadRequestError(
            'Bad request',
            'Token is not found'
        );
    }
};

// Verify User
getUserId: (authorization, res) => {
    let userId = -1;
    const token = parseAuth(authorization);
    try {
        const jwtToken = jwt.verify(token, JWT_SECRET);
        userId = jwtToken.userId;
    } catch (err) {
        throw new UnauthorizedError(
            "Unauthorized access",
            "Problem: invalid token "
        );
    }
    return userId;
};