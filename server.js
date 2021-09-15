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

io.on('connection', socket => {
  console.log(`${socket.id} has connected.`);

  socket.on("fileSelect", (data) => {
      console.log(`${socket.id} chose to listen to: ${data}`);
      socket.emit('size', getSongData(data));
  });

  socket.on('pause', (data) => {
    if (data!==true) {
      console.log('Music Paused');
    } else {
      console.log('Music Playing');
    }
  });

  socket.on('back', (data) => {
    if (data!==false) {
      console.log("Restart");
    }
  });

  socket.on('next', (data) => {
    if (data!==false) {
      console.log("Next Song.");
    }
  });
  
  socket.on('message', (data) => {
      socket.broadcast.emit('message', data);
  });
});

const PORT = 80;
//const PORT = 443;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));