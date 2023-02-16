const express = require('express');                     // Web framework for nodejs  
const app = express();
const http = require('http')                            // HTTP Library 
const server = http.createServer(app); 

app.get("/", (req, res) => {
    res.send("Hello World!")
})


server.listen(process.env.PORT || 8000, () => {
    console.log(`listening on http://localhost:${process.env.PORT || 8000}/`);
});
