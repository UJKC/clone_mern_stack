const express = require('express');

const router = express.Router();

const { home } = require('../controller/user')

// Url config which listens the page subdomain
router.get('/user', (req, res) => {
    res.send("Listening from user website")
});

router.get("/books", (req, res) => {
    res.send('Listening from books');
});

router.get("/", (req, res) => {
    res.send('Listening from home');
});

router.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// Export the routes
module.exports = router;