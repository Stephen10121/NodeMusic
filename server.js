const https = require("http");
const express = require('express');
const path = require('path');
const fs = require('fs');
const { getFiles, getSongData} = require('./functions.js');
const socketio = require('socket.io');

const app = express();
app.set('view engine', 'ejs');
app.use(
    express.json(),
    express.static('public'),
    express.urlencoded({ extended: true })
    );
const server = https.createServer(
    app
);

const io = socketio(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

app.get('/', async (req, res) => {
  res.render('index', {files: getFiles()});
});

app.get('/source', (req, res) => {
  res.render('source');
});

var song = null;
var paused = null;
var volume = 70;
var duration = getSongData(song);
var counter = 0;
var origin = new Date().getTime();
let links = {};

io.on('connection', socket => {
  console.log(`${socket.id} has connected.`);
  io.to(socket.id).emit('adminFileChoose', song);
  io.to(socket.id).emit('adminPause', paused);
  io.to(socket.id).emit('adminVolume', volume);
  io.to(socket.id).emit('adminSrcTime', counter);

  socket.on("fileChoose", (data) => {
    song = data;
    duration = getSongData(data);
    paused = false;
    socket.broadcast.emit("adminFileDuration", duration);
    socket.emit("adminFileDuration", duration);
    socket.broadcast.emit('adminFileChoose', `${data}`);
  });

  socket.on('pause', (data) => {
    paused = data;
    if (data!==false) {
      socket.broadcast.emit('adminPause', true);
    } else {
      socket.broadcast.emit('adminPause', false);
    }
  });

  socket.on('volume', (data) => {
    volume = data;
    socket.broadcast.emit('adminVolume', data);
  });

  socket.on('srcTime', (data) => {
    counter = data;
    socket.broadcast.emit('adminSrcTime', data);
  });

  socket.on('time', (data) => {
    socket.broadcast.emit('adminTime', data);
  });

  socket.on("makeRoom", (data) => {
    links[socket.id] = data;
    console.log(links);
  });

  socket.on("getFiles", (data) => {
    if (data === "new_get") {
      io.to(socket.id).emit("getFiles", getFiles());
      return;
    }
    console.log(data);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
