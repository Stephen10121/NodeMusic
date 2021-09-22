const express = require('express');
const socket = require('socket.io');
const fs = require('fs');
const app = express();
const https = require('https');
const path = require('path');

const server = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname,"key.key")),
        cert: fs.readFileSync(path.join(__dirname,"cert.crt"))
    },
    app
);
app.use(express.static('public'));
const io = socket(server);

var count = 0;

io.on('connection', (socket) => {

    console.log("New socket connection: " + socket.id)

    socket.on('counter', () => {
        count++;
        console.log(count)
        io.emit('counter', count);
    })
})

var PORT = process.env.PORT || 443;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));