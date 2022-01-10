const jwt = require('jsonwebtoken');

async function generateJWT( uuid ) {
    return new Promise( (resolve, reject) => {
        const payload = { uuid };
        jwt.sign( payload, process.env.SECRETKEY, {expiresIn: '4h'}, 
        (error, token ) => {
            if (error) {
                console.log(error);
                reject('We can not generate the token');
            } else {
                resolve( token );
            }
        });


    })
}

module.exports = {
    generateJWT,
}