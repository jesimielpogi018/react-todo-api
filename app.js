// parser for the .ENV file
require("dotenv").config();

const express = require("express");
const app = express();

// allocate middleware

// import routes
const todos = require("./todos/todos");

// allocate routes
app.use("/todos", todos);

// routes
app.get("/", (req, res, next) => {
    res.send("Hello, world!");
});

// define the port for the server
const PORT = process.env.PORT || 3000;


// start the server
app.listen(PORT, () => {
    console.log(`App is listening to the port ${PORT}!`);
});