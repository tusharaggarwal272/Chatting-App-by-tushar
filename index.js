const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');

const users={};
app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection',(socket)=>{
    socket.on('send_msg',(data)=>{
        io.emit('recieved_msg',{
            msg:data.msg,
            user:users[socket.id]
        });


       
    });

    socket.on('login',(data)=>{
        users[socket.id]=data.username
    })
})

server.listen(process.env.PORT || 2323, () => {
    console.log('server is running at port 2323');
})

