const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
const { dbConnection } = require('./database/config')
dbConnection();

// App of Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// My routes
app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Sevidor corriendo en puerto', process.env.PORT);
});