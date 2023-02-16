'use strict';

let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./app')

let wss = new WSServer({
    server: server
});
  
server.on('request', app);

wss.on('connection', function connection(ws) {
    console.log('user connected')

    ws.on('message', function incoming(message) {
      
      console.log(`received: ${message}`);
      
      ws.send(JSON.stringify({
  
        answer: 42
      }));
    });
  });
  
  
  server.listen(process.env.PORT || 8000, function() {
  
    console.log(`http/ws server listening on ${process.env.PORT || 8000}`);
  });

