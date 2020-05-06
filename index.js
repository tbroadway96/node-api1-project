const express = require('express');
const shortId = require('shortid');

const server = express()
server.use(express.json())

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

let hubs = []
let lessons = []

//Initial method
server.get()('/', (req, res) => {
    res.json({ message: 'Hello, World' });
})

//CREATE
server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body;
    hubInfo.id = shortId.generate()
    hubs.push(hubInfo);
    res.status(201).json(hubInfo);
})

//READ
server.get('/api/hubs', (req, res) => {
    res.status(200).json(hubs);
})

//DELETE
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    hubs.find(hub => {
        if (hub.id === id) {
            hubs = hubs.filter(hub.id !== id)
        } else {
            res.status(404).json({ message: 'Hub not found' })
        }
    })
    res.status(200).json(hubs)
})

//UPDATE
server.patch('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let found = hubs.find(hub => hub.id === id)
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'Hub not found'});
    }
})

server.put('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let index = hubs.findIndex(hub => hub.id === id)
    if (index !== -1) {
        hubs[index] = changes;
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'Hub not found'});
    }
})
