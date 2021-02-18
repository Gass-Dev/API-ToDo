// Imports
const express = require('express');
require('dotenv').config()
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const apiRouter = require('./apiRouter');
const {
    errors_Handler,
    notFound_Handler
} = require('./middleware');
const {
    Router
} = require('express');


// Instantiate server
const server = express();
// const port = process.env.PORT;

// Configuration
server.use (morgan('dev'));
server.use (helmet());
server.use ('/', cors());

// Configure server
server.use (bodyParser.urlencoded({
    extended: true
}));
server.use (bodyParser.json());

// Configure route
server.use ('/api', apiRouter);

// server.use("*", notFound_Handler);
// server.use(errors_Handler);

// Listen to port
const port = 8000;

// Launch server
server.listen (port, () => {
    console.log(`Hello, You are listening Server ${port}.`)
});

module.exports = server;