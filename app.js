const express = require('express')
const mongoose = require('mongoose')

const url = 'mongodb+srv://gladson:12estoucontigo12@cluster0.ml8dj.mongodb.net/crudjs_db?retryWrites=true&w=majority'

const app = express()

/**
 * UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'name' of undefined
 * 
 */
app.use(express.json())

mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const con = mongoose.connection

con.on('open', () => {
    console.log('MongoDB conectado...')
})

const alienRouter = require('./routers/aliens')

app.use('/aliens', alienRouter)

app.listen(9000, () => {
    console.log('Servidor rodando...')
    console.log('http://localhost:9000')
})