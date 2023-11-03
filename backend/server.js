// import express
const express = require('express');

// making object of express
const app = express();

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