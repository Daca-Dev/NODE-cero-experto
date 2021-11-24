
const { response, request } = require('express');

const usersGet = ( req, res = response ) => {
    res.json({
        mssg: 'Hola mundo desde la clase Server!',
        method: 'get - controller'
    });
}
const usersPost = ( req = request, res = response ) => {
    const body = req.body;
    res.status(201).json({
        mssg: 'Hola mundo desde la clase Server!',
        method: 'post - controller',
        body
    });
}
const usersPut = ( req = request, res = response ) => {

    const { userID } = req.params;
    const queryParameters = req.query;

    res.json({
        mssg: 'Hola mundo desde la clase Server!',
        method: 'put - controller',
        userID,
        queryParameters
    });
}
const usersDelete = ( req, res = response ) => {
    res.json({
        mssg: 'Hola mundo desde la clase Server!',
        method: 'delete - controller'
    });
}


module.exports = {
    usersGet, usersPost, usersPut, usersDelete
}
