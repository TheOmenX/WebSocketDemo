'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { authenticateToken } = require('./middleware/authentication');
const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const login = [
    {username: 'admin',
    password:"$2a$12$YN3ZlUcJRVK4UxyeJ9F4b.0zlCWOzNtNCjl.LSmkPYBoZzhJ39gAi"},
    {username: 'tijn',
    password: '$2a$12$ATR8ffhxiBpedE6a5WMLb.jAaNJdTSDgf9MOvUAoEAMioY3NLkJTa'}
]

const users = [
    {name: 'Tijn'},
    {name: 'Joep'},
    {name: 'Ryan'},
    {name: 'Roos'},
    {name: 'Demi'},
    {name: 'Pepijn'},
    {name: 'Jet'},
    {name: 'Floor'},
    {name: 'Amber'},
    {name: 'Sieb'},
]

const catagories = [
    "Hard Lopers",
    "Warme Dranken",
    "Bieren",
    "Gebak",
    "Lunch"
]

const products = [
    {
        id: "1",
        name: "Cappuccino",
        price: 3.3,
        catagories: [0,1],
        ingredients: ["koekje"]
    },{
        id: "2",
        name: "Koffie",
        price: 2.9,
        catagories: [0,1],
        ingredients: ["koekje"]
    },{
        id: "3",
        name: "Tosti",
        price: 5.5,
        catagories: [0,4],
        ingredients: ["Ham", "Kaas", "Curry"]
    },{
        id: "4",
        name: "Appeltaart",
        price: 4.2,
        catagories: [0,3],
        ingredients: []
    },{
        id: "5",
        name: "Grolsch",
        price: 3.3,
        catagories: [0,2],
        ingredients: []
    },{
        id: "6",
        name: "Weizen",
        price: 2.9,
        catagories: [2],
        ingredients: []
    },{
        id: "7",
        name: "Broodje Zalm",
        price: 5.5,
        catagories: [4],
        ingredients: ["Zalm", "Sla", "Roomkaas", "Dille", "Kappertjes"]
    },{
        id: "8",
        name: "Cheesecake",
        price: 4.2,
        catagories: [3],
        ingredients: []
    }
]

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello, World!')
});

app.post('/token', async (req,res) => {
    let token = jwt.sign({ user: req.body.username }, jwt_secret);
    let pass = login.find(x => x.username == req.body.username)?.password
    if(pass && await bcrypt.compare(req.body.password, pass)) res.json({token})
    else res.json()
})

app.get('/users', authenticateToken, (req,res) => {
    res.json(users)
})

app.get('/products', authenticateToken, (req,res) => {
    res.json(products)
})

app.get('/catagories', authenticateToken, (req,res) => {
    res.json(catagories)
})
module.exports = app;