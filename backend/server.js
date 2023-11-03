// import express
const express = require('express');
const cors = require('cors')

// making object of express
const app = express();

/*
// Allowed url array (only header is checked here if the orgin is www.example.com it will not respond)
let allowed = [ 'http://localhost:3000', 'and other links' ];

// Function to check the allowed network
function options (req, res) {
    let tmp;

    let origin = req.header("Origin");

    if (allowed.indexOf(origin) > -1) {
        tmp = {
            origin: true,
            optionSuccessStatus: 200,
        };
    }
    else {
        tmp = {
            origin: 'stupid',
        };
    }
    res(null, tmp);
}

The code you provided is for handling Cross-Origin Resource Sharing (CORS) in an Express.js application. It defines a custom `options` function that checks the `Origin` header of incoming HTTP requests against an array of allowed origins (`allowed`). The purpose of this code is to control which origins are allowed to make requests to your server.

Let's break down the code with an example URL request to illustrate how it works:

Suppose you have an Express.js application running on your server, and you've set up CORS using the provided code. The `allowed` array contains a list of allowed origins, including `'http://localhost:3000'` and potentially other URLs.

Now, let's consider a scenario where a client makes an HTTP request to your server:

**Example URL Request:**

1. **Request from a Whitelisted Origin**:
   - The client makes an HTTP request from a web page hosted at `http://localhost:3000`.
   - The client's request includes an `Origin` header with the value `'http://localhost:3000'`.
   - When the request reaches your server, the custom `options` function is called.
   - Inside the function, it checks if the value of the `Origin` header (which is `'http://localhost:3000'`) is present in the `allowed` array.
   - Since `'http://localhost:3000'` is in the `allowed` array, the function returns an object with CORS headers allowing the request:
     ```javascript
     {
       origin: true,
       optionSuccessStatus: 200,
     }
     ```
   - The client's request is allowed, and the response is sent back to the client with appropriate CORS headers that enable the request to be processed.

2. **Request from a Non-Whitelisted Origin**:
   - The client makes an HTTP request from a web page hosted at a different URL, such as `'http://example.com'`.
   - The client's request includes an `Origin` header with the value `'http://example.com'`.
   - When the request reaches your server, the custom `options` function is called.
   - Inside the function, it checks if the value of the `Origin` header (which is `'http://example.com'`) is present in the `allowed` array.
   - Since `'http://example.com'` is not in the `allowed` array, the function returns an object with CORS headers that restrict access:
     ```javascript
     {
       origin: 'stupid',
     }
     ```
   - The client's request is denied, and the response is sent back with CORS headers that prevent the request from being processed.

This code allows you to control which origins are permitted to access your server's resources. Requests from allowed origins are processed, while requests from disallowed origins are blocked based on the configuration in the `options` function.

// use cors
app.use(cors(options));

// Url config which listens the page subdomain
app.get("/", (req, res) => {

    // Sends the result to screen
    res.send('Listening from home');
});
*/

app.use(cors())

const userrouter = require('./routes/user');

app.use('/', userrouter);

// making sure server is listening (Simply port config) and this is the origin of requests from frontend
app.listen(8000, () => {
    console.log('server is listening');
});