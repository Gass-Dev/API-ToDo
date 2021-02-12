// Imports
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generate Token
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
                userId: userData.id,
        },
            JWT_SECRET,
            {
                expiresIn: "4h",
            }
        );
    },
};