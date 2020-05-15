const express = require('express');
const shortId = require('shortid');
require('dotenv').config();

const server = express()
server.use(express.json())

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

let users = [
    {
        id: 0,
        name: 'Jane Doe',
        bio: 'Software Engineer'
    }
]

//Initial Method
server.get('/', (req, res) => {
    res.json({ message: 'Welcome to the users page' });
})

//CREATE
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
        const userInfo = req.body;
        userInfo.id = shortId.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
    }
})

//READ
server.get('/api/users', (req, res) => {
    if (!users) {
        res.status(500).json({ errorMessage: 'The users information could not be retrieved.'});
    } else {
        res.status(200).json(users);
    }
})

//READ USER
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.find(user => {
        if (user.id === id) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
    })
})

//UPDATE
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user.'});
    } else {
        users.find(user => {
            if (user.id === id) {
                Object.assign(user, changes);
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist'});
            }
        })
    }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.find(user => {
        if (user.id === id) {
            users = users.filter(user => user.id !== id);
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
    })
})
