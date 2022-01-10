const { request, response } = require('express');
const User = require('../models/user');


async function validateRole(req = request, res = response, next) {

    const user = res.user;

    if ( !user ) return res.status(500).json({
            msg: 'the rople should be validate after token validation'
        });

    if (user.role !== 'ADMIN_ROLE') return res.status(401).json({
        msg: 'the user does not has the permission'
    })

    next();
}

function haveRole(...roles) {    
    return async(req = request, res = response, next) => {
        const user = res.user;
        if ( !user ) return res.status(500).json({
            msg: 'the rople should be validate after token validation'
        });

        if(!roles.includes(user.role)) return res.status(401).json({
            msg: 'the user does not has the permission'
        })

        next();

    }
}

module.exports = {
    validateRole,
    haveRole
}
