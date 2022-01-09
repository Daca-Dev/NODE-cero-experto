
const { response } = require('express');
const express = require('express');
const cors = require('cors');

const { connectDB } = require('./../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // db connection
        this.connectWithDB();

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

    async connectWithDB() {
        await connectDB();
        console.log('Connection with DB success');
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