const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', (socket) => {
    console.log("new user");

    socket.on('disconnect', () => {
        console.log("user disconnected :/");
    });

    socket.on('sendingMessageFromClient', (msg) => {
        console.log('message !');
        io.emit('broadcastMessageFromServer', msg);
    });
});


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

