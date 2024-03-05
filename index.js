const express = require('express');
app=express();
port = 3000;
const http = require('http').createServer(app)

path = require('path');
http.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})