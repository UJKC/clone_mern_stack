const jwt = require('jsonwebtoken');

exports.generateTokens = (payload, expired) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: expired,
    })
}