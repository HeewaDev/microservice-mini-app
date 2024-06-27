const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const posts = {};
app.get('/', (req, res) =>{
    res.send('hello dear')
})
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        });
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error.message);
    }

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event for post', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
