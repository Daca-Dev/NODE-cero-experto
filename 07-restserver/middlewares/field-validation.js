const { validationResult } = require('express-validator');

function validateFields(req, res, next) {
    // verify all the validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // if everithing is ok execute the next callback
    next();
}

module.exports = {
    validateFields,
}