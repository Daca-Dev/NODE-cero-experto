const bcrypt = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require('../helpers/token-generator');

async function login(req, res) {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user || !user.state ) return res.status(404).json({
            msg: 'The email is not register',
        })
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) return res.status(404).json({
            msg: 'The email / password are incorrect',
        })

        // generate JWT
        const token = await generateJWT( user.id );

        // if we use many res.json statement it throw a error, only
        // once we can do this method
        res.json({ user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mgs: 'Something goes wrong',
        })
    }
}

module.exports = {
    login,
}