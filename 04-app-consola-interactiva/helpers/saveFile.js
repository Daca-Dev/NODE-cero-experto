// pquetes
const fs = require('fs');

// variables
const archivo = './db/data.json';


const leerDB = () => {

    if ( !fs.existsSync( archivo ) ) {
        return null;
    }
    
    const data = fs.readFileSync( archivo );
    return JSON.parse( data );
}

const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify( data ) );
}

module.exports = {
    guardarDB, leerDB
}