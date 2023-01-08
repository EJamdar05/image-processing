import express from 'express';
import routes from './routes/index'
const app = express()
const port = 4000;

app.use('/api', routes)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

// app.get('/api', (req, res)=>{
//     console.dir(req.protocol)
//     res.send(`IP Address: ${req.ip}`)
// })