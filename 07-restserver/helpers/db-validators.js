const Role = require('../models/role');
const User = require('../models/user');


async function validRole(role = '') {
    const roleExist = await Role.findOne({ role })
    if (!roleExist) {
        throw new Error(`the role ${role} is not a valid error`);
    }
}

async function uniqueEmail(email = '') {
    const inUse = await User.findOne({ email });
    if (inUse) {
        throw new Error(`the email ${email} is already in use`);
    }
}

async function userIdExist(id = '') {
    const userExist = await User.findById(id); console.log(`🚀 ~ userIdExist ~ userExist`, userExist);
    if (!userExist || !userExist.state) {
        throw new Error(`the user with id ${id} does not exist`);
    }
}


module.exports = {
    validRole,
    uniqueEmail,
    userIdExist,
}
