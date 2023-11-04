const User = require('../models/user');

const validate = require('../helpers/validation');
const validate_tken = require('../helpers/token');

const bcrypt = require('bcrypt')

exports.register = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            gender,
            bday,
            bmonth,
            byear,
        } = req.body;

        /*
        if (!validate(email)) {
            return res.status(400).json({
                message: 'email error',
            });
        }
        validate length of firstname, lastname, password
        validate username
        section 3 22
        */

        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message: 'email error, try something else',
            });
        }

        const checku = await User.findOne({ username });
        if (checku) {
            return res.status(400).json({
                message: 'username error, try something else',
            });
        }

        /*
        // Cryptic password
        const cryptic = await bcrypt.hash(password, 12);
        console.log(cryptic);
        */

        const user = await new User({
            firstName,
            lastName,
            username,
            password, //cryptic,
            email,
            gender,
            bday,
            bmonth,
            byear,
        }).save()

        const emailVarification = validate_tken.generateTokens({id: user._id.toString()}, '30m');
        console.log(emailVarification);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

/*
The code responsible for sending data to the database is the Mongoose schema definition and model creation. In your provided code, the relevant part is:

```javascript
const userSchema = mongoose.Schema({
    // ... fields and schema options ...
});

module.exports = mongoose.model('User', userSchema);
```

This code defines the structure of the `User` document and the schema for the data you want to store in the database. It's the blueprint for your `User` objects.

To actually send data to the database, you would use this schema and model to create and save new `User` documents. For example, in your registration code snippet, you create a new `User` document and save it to the database:

```javascript
const user = await User.create({
    firstName,
    lastName,
    username,
    password,
    email,
    gender,
    bday,
    bmonth,
    byear,
});
```

Here, the `User.create` method is used to create and save a new user document with the provided data.

So, the schema definition and model creation specify how your data should be structured and managed in the database, while actual data insertion or modification is done through methods like `create`, `save`, or other Mongoose operations.
*/