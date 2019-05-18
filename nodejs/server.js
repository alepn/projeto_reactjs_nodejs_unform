const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '.', 'tmp')));
app.use(cors());

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser:true});

requireDir('./src/models');

// const Product = mongoose.model('Product');

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use('/api', require('./src/routes'));

server.listen(process.env.PORT || 8000);