// import express
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
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

const { readdirSync } = require('fs');
const { error } = require('console');

/*
The `fs` module in Node.js stands for "File System," and it provides a set of functions for working with the file system on your computer or server. It allows you to perform various operations related to reading, writing, updating, and managing files and directories.

The `fs` module provides both synchronous (blocking) and asynchronous (non-blocking) methods for file I/O, making it versatile for different use cases. Here are some common operations you can perform using the `fs` module:

1. **Reading Files**:
   - `fs.readFile`: Reads the contents of a file asynchronously.
   - `fs.readFileSync`: Reads the contents of a file synchronously.

2. **Writing Files**:
   - `fs.writeFile`: Writes data to a file asynchronously.
   - `fs.writeFileSync`: Writes data to a file synchronously.

3. **Working with Directories**:
   - `fs.readdir`: Reads the contents of a directory asynchronously.
   - `fs.readdirSync`: Reads the contents of a directory synchronously.
   - `fs.mkdir`: Creates a directory asynchronously.
   - `fs.mkdirSync`: Creates a directory synchronously.

4. **File and Directory Information**:
   - `fs.stat`: Retrieves information about a file or directory asynchronously.
   - `fs.statSync`: Retrieves information about a file or directory synchronously.

5. **Renaming and Deleting**:
   - `fs.rename`: Renames a file or directory asynchronously.
   - `fs.renameSync`: Renames a file or directory synchronously.
   - `fs.unlink`: Deletes a file asynchronously.
   - `fs.unlinkSync`: Deletes a file synchronously.

6. **Working with Streams**:
   - `fs.createReadStream`: Creates a readable stream from a file.
   - `fs.createWriteStream`: Creates a writable stream to a file.

The `fs` module is a core module in Node.js, so you don't need to install it separately; it's available by default when you use Node.js. It's particularly useful for building applications that involve file manipulation, file reading and writing, and file system operations, such as web servers, utilities, and data processing scripts.
*/

// Cores configuration
app.use(cors());

/*
// Get routes from user.js in backend
const userrouter = require('./routes/user');

// Prefix to use
app.use('/api', userrouter);

console.log(readdirSync('./routes'));

The code you provided is a combination of functions in JavaScript, and it appears to be used to dynamically load and attach route handlers to an Express.js application. Let's break down the code step by step:

1. `readdirSync('./routes')`: This line reads the contents of the `'./routes'` directory synchronously using the `readdirSync` method from the `fs` module. It returns an array of file and directory names in that directory. In this context, it's expected that the `'./routes'` directory contains files that define route handlers.

2. `.map((r) => app.use('/', require('./routes/user' + r))`: This is a chain of methods applied to the array of file and directory names obtained from `readdirSync`.

   - `.map((r) => ... )`: This part of the code uses the `map` function, which iterates over each element (in this case, the file names) in the array and applies a given function to each element. The function provided takes the current element, denoted as `r`, and processes it.

   - `app.use('/', require('./routes/user' + r))`: Within the `map` function, this code is executed for each `r`, which represents a file name from the `'./routes'` directory.

     - `require('./routes/user' + r)`: This `require` statement is dynamically loading a module based on the value of `r`. It assumes that the files in the `'./routes'` directory follow a naming pattern where `'user'` is the prefix, and `r` is the variable part of the file name. For example, if `r` is `'profile.js'`, this will attempt to require `'./routes/userprofile.js'`.

     - `app.use('/', ... )`: This line attaches the middleware or route handlers from the dynamically loaded module to the Express.js `app` object. The `'/'` route is used as the base route for these handlers.

Overall, this code reads all the files in the `'./routes'` directory and attempts to dynamically load each of them as route handler modules. These modules are assumed to export route handling functions that are attached to the Express.js application at the `'/'` route. This approach allows you to modularize your route handlers and add them to your Express application without explicitly specifying each one individually in your code.
*/
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

// Env config if the file does not exist it takes 8000
const PORT = process.env.PORT || 8000;

// Mongoose connect
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, // Enable the URL parser
    useUnifiedTopology: true, // Enable the new Server Discover and Monitoring engine
  })
  .then(() => console.log('Database connection successful'))
  .catch(() => console.log('Database connection failed'));

// making sure server is listening (Simply port config) and this is the origin of requests from frontend
app.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
});

/*
xajil78992@jucatyo.com
Kncgreat1!

Ukc
Kncgreat1
*/