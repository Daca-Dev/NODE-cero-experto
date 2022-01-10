const validateFields = require('../middlewares/field-validation');
const validateJWT = require('../middlewares/jwt-validation');
const validateRoles = require('../middlewares/role-validation');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
}