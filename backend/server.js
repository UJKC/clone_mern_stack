// import express
const express = require('express');
const cors = require('cors')

// making object of express
const app = express();

// options for cors to allow traffic
const options = {
    origin: 'http://localhost:3000/'
};

// use cors
app.use(cors(options));

// Url config which listens the page subdomain
app.get("/", (req, res) => {

    // Sends the result to screen
    res.send('Listening from home');
});

// Url config which listens the page subdomain
app.get("/books", (req, res) => {
    res.send('Listening from books');
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// making sure server is listening (Simply port config)
app.listen(8000, () => {
    console.log('server is listening');
});