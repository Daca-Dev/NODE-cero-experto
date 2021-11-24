
const { response } = require('express');
const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        // middlewares
        this.middlewares();

        // configure the routes
        this.routes();
    }

    middlewares() {
        // add CORS
        this.app.use( cors() );
        // read and parse of body
        this.app.use( express.json() );
        // add public directory
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        })
    }

}

module.exports = Server