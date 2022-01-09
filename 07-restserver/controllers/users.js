const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('./../models/user');

/**
 * get a list of users with a limit of 5 users per page and a count of total users
 * @param {*} req 
 * @param {*} res list of users
 */
const usersGet = async( req, res = response ) => {

    const { limit = 5, offset = 0 } = req.query;
    const query = { state: true };
    
    const [ total, users ] = await Promise.all([
        User.find(query).count(),
        User.find(query).skip(Number(offset)).limit(Number(limit)),
    ])

    res.json({ total, users });
}

/**
 * create a new user in cafe DB
 * @param {*} req request
 * @param {*} res response
 */
const usersPost = async( req = request, res = response ) => {

    // extract the require fields
    const {name, password, role, email} = req.body;

    // verify that a email is unique in DB
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(400).json({
            msg: 'The email is already register',
        })
    }
    // create user
    const user = new User({name, password, role, email});

    // sncrypt passw
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save()

    res.status(201).json({
        user,
    });
}

/**
 * updated an user on db
 * @param {*} req 
 * @param {*} res return de updated user
 */
const usersPut = async( req = request, res = response ) => {
    const { id } = req.params;
    const { __id, __v, password, google, email, ...data } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data );

    res.json(user);
}


const usersDelete = async( req, res = response ) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, {state: false});

    res.json({
        mssg: `the user with id ${id} was deleted succesfully`,
    });
}


module.exports = {
    usersGet, usersPost, usersPut, usersDelete
}
