const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv/config');

const app = express()

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())

//para envio de arquivos
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

app.listen(process.env.PORT, () => {
    console.info(`Running server on port ${process.env.PORT}`);
});