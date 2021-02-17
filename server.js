// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
require('dotenv').config();
require('express-async-errors');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware");


// Instantiate server
const server = express();
const PORT = process.env.PORT;

// Configuration
server.use(morgan('dev'));
server.use(helmet());
server.use('/', cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api/', apiRouter);

// Configure routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello! You are on my server</h1>');
});

//Listen to port
const port = 8080;

// Launch server
server.listen(port, () => {
    console.log(`Hello, You are listening Server ${PORT} :)`);
});

module.exports = server;