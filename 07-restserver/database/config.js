const mongoose = require('mongoose');

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);
    } catch(error) {
        console.log(error);
        throw new Error('The connection with database was fail.');
    }

}


module.exports = {
    connectDB,
}