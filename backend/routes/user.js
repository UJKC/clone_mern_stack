const express = require('express');

const router = express.Router();

//buggy
const { register, activateAccount, login} = require('../controller/user')


// Url config which listens the page subdomain
router.get('/user', (req, res) => {
    res.status(200).json({
        message: "Listening from user website"
    });
});

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

router.post("/register", register);

router.post('/activate', activateAccount);

router.post('/login', login);

// Export the routes
module.exports = router;