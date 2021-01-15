const express = require('express');
const server = express();
const projRouter = require('./projects/projects-router')
const actRouter = require('./actions/actions-router')

server.use(express.json())

server.use('/api/actions', actRouter)
server.use('/api/projects', projRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Juan's sprint challenge</h1>`);
  });

module.exports = server;
