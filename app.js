require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// const config = require('./config/settings')

const app = express()

/**
 * UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'name' of undefined
 * 
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// mongoose.connect(config.mongoURI, {
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const con = mongoose.connection

con.on('open', () => {
    console.log('MongoDB conectado...')
})

// ROUTE
app.use('/aliens', require('./routers/aliens'))

// SERVER - PORT
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta::${port}`)
})