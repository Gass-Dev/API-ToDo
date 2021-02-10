// Imports
const express = require('express');
const apiRouter = express.Router();
const usersCtrl = require('./routes/usersCtrl');
const models = require('./models');

// Router
exports.router = (() => {
    // Users routes gets

    // Users routes posts
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/signup', usersCtrl.signup);

    return apiRouter;
})();