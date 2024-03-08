const express = require('express');
app=express();
port = 3000;
path = require('path');

const http = require('http').createServer(app)
const server=app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

let socketsConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket){
    console.log('Socket connected', socket.id)
    socketsConnected.add(socket.id)
    io.emit('clients-total',socketsConnected.size)

socket.on('disconnect',()=>{
    console.log('Socket disconnected',socket.id)
    socketsConnected.delete(socket.id)
    io.emit('clients-total',socketsConnected.size)
})

socket.on('message',(data)=>{
    socket.broadcast.emit('chat-message',data)
})

socket.on('feedback',(data)=>{
    socket.broadcast.emit('feedback',data)
})
}
