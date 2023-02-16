'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());

// Let's create the regular HTTP request and response
app.get('/', function(req, res) {
    res.send('Hello, World!')
});

module.exports = app;