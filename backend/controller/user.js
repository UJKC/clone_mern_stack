const User = require('../models/user');

const validate = require('../helpers/validation');
const validate_tken = require('../helpers/token');

const bcrypt = require('bcrypt');

const { sendVarificationEmail } = require('../helpers/mailer');

const jwt = require('jsonwebtoken');

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

        if (!validate.validate(email)) {
            return res.status(400).json({
                message: 'email error',
            });
        }

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

        if (!validate.validateLength(password, 6, 12)) {
            return res.status(400).json({
                message: 'password error',
            });
        }

        const cryptic = await bcrypt.hash(password, 12);
        console.log(cryptic);

        const user = await new User({
            firstName,
            lastName,
            username,
            password: cryptic,
            email,
            gender,
            bday,
            bmonth,
            byear,
        }).save()

        const emailVarification = validate_tken.generateTokens({
            id: user._id.toString()
        }, '30m'
        );
        console.log(emailVarification);
        const url = `${process.env.BASE_URL}/activate/${emailVarification}`;
        sendVarificationEmail(user.email, user.firstName, url);
        const token = validate_tken.generateTokens({
            id: user._id.toString()
        }, "7d"
        );
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
            varification: user.varified,
            message: 'Register Success | Please activate your email to start'
        });
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

665669220792-nip66kbcjlfc4ol77c32q31fuq2neen8.apps.googleusercontent.com
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


auth: 4/0AfJohXnGu5wvNGEVHy3VytvRny7mI80OBn_f2-cVKjoNeCoujYzgGfYT614Tk_I32PD7Ww
*/

exports.activateAccount = async(req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const check = await User.findById(user.id);
        if (check.varified == true) {
            return res.status(400).json({
                message: "This email is varified"
            });
        }
        else {
            await User.findByIdAndUpdate(user.id, {
                varified: true
            });
            return res.status(200).json({
                message: "Email and account activated"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
       const { email, password } = req.body;
       const user = await User.findOne({
        email
       });
       if (!user) {
        return res.status(400).json({
            message: "The email address is wrong"
        });
       }
       const check = await bcrypt.compare(password, user.password);
       if (!check) {
        return res.status(400).json({
            message: "Invalid password"
        });
       }
       const token = validate_tken.generateTokens({
        id: user._id.toString()
        }, "7d"
        );
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
            varification: user.varified,
            message: 'Register Success | Please activate your email to start'
        });
    }
    catch {
        res.status(500).json({
            message: err.message,
        });
    }
}