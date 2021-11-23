
const { response } = require('express');
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // middlewares
        this.middlewares();

        // configure the routes
        this.routes();
    }

    middlewares() {
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.get('/api', ( req, res ) => {
            res.json({
                mssg: 'Hola mundo desde la clase Server!',
                method: 'get'
            })
        })
        this.app.post('/api', ( req, res ) => {
            res.json({
                mssg: 'Hola mundo desde la clase Server!',
                method: 'post'
            })
        })
        this.app.put('/api', ( req, res ) => {
            res.json({
                mssg: 'Hola mundo desde la clase Server!',
                method: 'put'
            })
        })
        this.app.delete('/api', ( req, res ) => {
            res.json({
                mssg: 'Hola mundo desde la clase Server!',
                method: 'delete'
            })
        })
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        })
    }

}

module.exports = Server