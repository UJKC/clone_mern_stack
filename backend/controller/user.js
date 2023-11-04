const User = require('../models/user');

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
        } = req.body
        const user = await new User({
            firstName,
            lastName,
            username,
            password,
            email,
            gender,
            bday,
            bmonth,
            byear,
        }).save()
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