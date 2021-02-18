// Imports
const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');
const usersCtrl = require('./controllers/usersCtrl');

apiRouter.use(bodyParser.json());

// Router

// Users routes 
apiRouter.post('/login', usersCtrl.login);
apiRouter.post('/signup', usersCtrl.signup);

// Task routes

// ListTask routes

module.exports = apiRouter;