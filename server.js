const https = require("http");
//const https = require("https");
const express = require('express');
const path = require('path');
const fs = require('fs');
const { getFiles, getSongData } = require('./functions.js');
const socketio = require('socket.io');

const app = express();
app.set('view engine', 'ejs');
app.use(
    express.json(),
    express.static('public'),
    express.urlencoded({ extended: true })
    );
const server = https.createServer(
    //{
    //    key: fs.readFileSync(path.join(__dirname,"key.key")),
    //    cert: fs.readFileSync(path.join(__dirname,"cert.crt"))
    //},
    app
);

const io = socketio(server);

app.get('/', async (req, res) => {
  res.render('index', {files: getFiles()});
});

app.get('/source', (req, res) => {
  res.render('source');
});

var song = null;
var paused = null;
io.on('connection', socket => {
  console.log(`${socket.id} has connected.`);
  io.to(socket.id).emit('adminFileChoose', song);
  io.to(socket.id).emit('adminPause', paused);

  socket.on("fileChoose", (data) => {
    song = data;
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
});

const PORT = 80;
//const PORT = 443;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));