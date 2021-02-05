// Imports
const express = require('express');

// Instantiate server
const server = express();

// Configure routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello! You are on my server</h1>');
});

//Listen to port
const port = 8080;

// Launch server
server.listen(port, () => {
    console.log(`Hello, You are listening Server ${port} :)`);
});

module.exports = server;