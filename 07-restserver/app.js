require('dotenv').config();
const Server = require('./models/server.class');


const server = new Server();

server.listen();
