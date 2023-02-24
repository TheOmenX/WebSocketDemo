'use strict';

let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./app')
const crypto = require("crypto");

let wss = new WSServer({
    server: server
});
server.on('request', app);

const users = {}
const activeTables = []

const table = {
  1234: [
      {id: 2, name: "Koffie", count: 4, price: 2.9, comment: [], time: Date.now()},
      {id: 4, name: "Appeltaart", count: 1, price: 4.2, comment: ["Stop"], time: Date.now()}
    ]
}

wss.on('connection', function connection(ws) {
  const id = crypto.randomBytes(8).toString("hex");
  ws.id = id
  users[ws.id] = ws
  console.log(`user connected with id: ${id}`)


  ws.on('message', function incoming(message) {
    console.log(`received: ${message} from ${ws.id} ${ws.table ? `at table ${ws.table}` : ""}`);
    let data = JSON.parse(message)

    let index = activeTables.findIndex(x => x.table == data.table)
    if(index != -1) {
      console.log('table found')
      if(users[activeTables[index].user].readyState == 1) {
        ws.send(JSON.stringify({
        "status": "[ERROR]: Table already exists",
        //"data": "" Optional
      
        }))
        ws.terminate(); 
        console.log("Connection terminated, table already in use"); 
        return
      }
    }

    activeTables.push({table: data.table, user: ws.id})
    users[ws.id].table = data.table
    ws.send(JSON.stringify(table[data.table]));
  });

  ws.on("close", () => {
    delete users[ws.id]
    if(ws.table) {
      let index = activeTables.indexOf(`${ws.table}`)
      activeTables.splice(index, 1)
    }
  })  
});

server.listen(process.env.PORT || 8000, function() {
  console.log(`[START]: HTTP/ws server listening on ${process.env.PORT || 8000}`);
});

