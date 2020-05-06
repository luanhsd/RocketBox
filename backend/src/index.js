const express = require('express')

const app = express()

app.use(express.json())

//para envio de arquivos
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))

app.listen(3001)