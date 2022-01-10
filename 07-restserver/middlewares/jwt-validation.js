const { request, response } = require('express');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function validateJWT( req = request, res = response, next) {
    const token = req.headers['x-token'];
    if (!token) {
        return res.status(401).json({
            msg: 'Token was not provided'
        })
    }
    
    try {
        const { uuid } = jwt.verify(token, process.env.SECRETKEY)
        // add the id to response body (this obj pass by reference)
        const user = await User.findById( uuid );

        // verify if the user is active
        if (!user || !user.state) throw new Error('The user is not register');

        res.user = user
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'invalid token'
        })
    }


}

module.exports = {
    validateJWT
}
