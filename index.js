const express = require('express');                     // Web framework for nodejs  
const app = express();
const http = require('http')                            // HTTP Library 
const server = http.createServer(app); 

// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })



app.get("/", (req, res) => {
    res.send("Hello World!")
})


server.listen(process.env.PORT || 8000, () => {
    console.log(`listening on http://localhost:${process.env.PORT || 8000}/`);
});

 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
 
    // sending message to client
    ws.send('Welcome, you are connected!');
 
    //on message from client
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
