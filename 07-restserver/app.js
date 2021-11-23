require('dotenv').config();
const Server = require('./models/Server.class');


const server = new Server();

server.listen();
