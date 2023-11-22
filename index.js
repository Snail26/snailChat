const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      io.emit('dev message', "User Dissconnected")
      console.log('Dev: user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
    });
    socket.on('dev message', (msg) => {
        console.log("Dev: " + msg)
        io.emit('dev message', msg);
    })
    socket.on('vc', (msg) => {
        io.emit('vc', msg);
    })
  });
  

