const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

mongoose.connect(
    'mongodb+srv://Omnistack:Omnistack@omnistacks-iqkby.mongodb.net/reactbox?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())

//para envio de arquivos
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

app.listen(3001)