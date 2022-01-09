const { Schema, model } = require('mongoose');

/**
 * user model representation for mongoose ORM
 */
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
        enu: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


// export user model
module.exports = model('User', UserSchema);