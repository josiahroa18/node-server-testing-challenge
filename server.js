const express = require('express');
const User = require('./dbHelper');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

// Get users from database
server.get('/users', (req, res) => {
    User.getUsers()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Add user to database
server.post('/users', (req, res) => {
    User.addUser(req.body)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Delete user from database
server.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id)
    .then(() => {
        res.status(201);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = server;