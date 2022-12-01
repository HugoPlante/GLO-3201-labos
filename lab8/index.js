const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json())

const users = {};

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    
});

app.post('/users', (req, res) => {
    const id = uuid.v4();
    users[id] = { username: req.body.username, password: req.body.password };
    res.send({ id });
    console.log("GET /users");
});