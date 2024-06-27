const express = require('express')
const axios = require('axios')

const app = express()


app.post('/events', async (req, res) =>{
 const {type, data} = req.body;
 if(type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    try {
        await axios.post('/http://localhost:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content,
            }
        })
    } catch (error) {
        console.log(error.message)
    }
    res.send({})
 }

})


app.listen(4003, ()=>{
    console.log('server listening on port 4003')
})