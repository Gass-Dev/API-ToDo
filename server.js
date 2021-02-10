// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;


// Instantiate server
const server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello! You are on my server</h1>');
});

server.use('/api/', apiRouter);

//Listen to port
const port = 8080;

// Launch server
server.listen(port, () => {
    console.log(`Hello, You are listening Server ${port} :)`);
});

module.exports = server;