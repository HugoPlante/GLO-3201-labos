const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const PORT = 8000;

const users = {};

app.use(cors());

app.use((req, res, next) => {
    res.header("Content-Type", 'application/json');
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send("fontionnel !");
});

app.post('/users', (req, res) => {
    const id = uuid.v4();
    users[id] = [];
    res.send({ id });
    console.log("GET /users");
});

app.use('/:userId/', (req, res, next) => {
    if (!(req.params.userId in users)) {
        res.status(404).send("User not found");
    } else {
        next();
    }
});

app.get('/:userId/tasks', (req, res) => {
    const tasks = users[req.params.userId];
    console.log('GET tasks')
    res.send({ tasks });
});

app.post('/:userId/tasks', (req, res) => {
    if (!req.body.name || !req.body.name === "") {
        res.status(400).send("Bad request");
    } else {
        const task = { ...req.body, id: uuid.v4() };
        users[req.params.userId].push(task);
        res.send(task);
        console.log("POST /tasks");
    }
});

app.put('/:userId/tasks/:taskId', (req, res) => {
    if (!users[req.params.userId].some(task => task.id == req.params.taskId)) {
        res.status(400).send("Task not found");
    } else {
        const taskIndex = users[req.params.userId].findIndex(task => task.id === req.params.taskId);
        console.log(taskIndex);
        users[req.params.userId][taskIndex].name = req.body.name;
        res.send(users[req.params.userId][taskIndex]);
        console.log("PUT /tasks");
    }
});

app.delete('/:userId/tasks/:taskId', (req, res) => {
    if (!users[req.params.userId].find(task => task.id === req.params.taskId)) {
        res.status(400).send("Task not found");
    } else {
        users[req.params.userId] = users[req.params.userId].filter(task => task.id !== req.params.taskId);
        res.status(204).send("Task deleted");
        console.log("DELETE /tasks");
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});