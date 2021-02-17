// Imports
const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');
const usersCtrl = require('./routes/usersCtrl');
const models = require('./models');

apiRouter.use(bodyParser.json());

// Router
exports.router = (() => {
    // Users routes gets

    // Users routes posts
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/signup', usersCtrl.signup);

    return apiRouter;
})();