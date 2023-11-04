const express = require('express');

const router = express.Router();

//buggy
const { home } = require('../controller/user')

/*
// Url config which listens the page subdomain
router.get('/user', (req, res) => {
    res.status(200).json({
        message: "Listening from user website"
    });
});
*/

router.get("/books", (req, res) => {
    res.status(200).json({
        message: 'Listening from books'
    });
});

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'Listening from home'
    });
});

router.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

router.get("/user", home);

// Export the routes
module.exports = router;