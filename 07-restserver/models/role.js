const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'the role is requried']
    }
})

module.exports = model('Role', RoleSchema);
