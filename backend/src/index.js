require('dotenv/config');
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use((request, response, next) => {
    request.io = io
    return next()
})


//para envio de arquivos
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

server.listen(process.env.PORT, () => {
    console.info(`Running server on port ${process.env.PORT}`);
});