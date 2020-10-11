require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// const config = require('./config/settings')

const app = express();

/**
 * UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'name' of undefined
 *
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect(config.mongoURI, {
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const con = mongoose.connection;

con.on("open", () => {
    console.log("MongoDB conectado...");
});

// ROUTE
app.use("/aliens", require("./src/routers/aliens"));

// SERVER - PORT
const port = process.env.PORT || 9000;
const host = process.env.HOST || "http://localhost";

app.listen(port, () => {
    console.log(`Servidor rodando na porta => ${host}:${port}`);
});
