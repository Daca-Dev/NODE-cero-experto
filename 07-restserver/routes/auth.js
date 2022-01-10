const { Router } = require('express')
const { body } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validation');

const router = Router();

router.post('/login', [
        body('email', 'the field should be a valid email').isEmail(),
        body('password', 'the field is empty').not().isEmpty(),
        validateFields,
    ], login
)


module.exports = router;
