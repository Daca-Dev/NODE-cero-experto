const { Router } = require('express');
const { check, param } = require('express-validator');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { validRole, uniqueEmail, userIdExist } = require('./../helpers/db-validators');

// const { validateFields } = require('../middlewares/field-validation');
// const { validateJWT } = require('../middlewares/jwt-validation');
// const { validateRole, haveRole } = require('../middlewares/role-validation');
const { validateFields, validateJWT, validateRole, haveRole} = require('../middlewares');

const router = Router();


router.get('/', [
    validateJWT,
    // validateRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
],usersGet );

router.post('/', [ // if we use thre arguments, the second one is an array of validators
        check('name', 'The field is required').not().isEmpty(),
        check('password', 'The password should have min lenght of 8').isLength({ min: 8 }),
        check('email').custom( uniqueEmail ),
        check('role').custom( validRole ),
        validateFields,
    ],
    usersPost
);

router.put('/:id',[
        param('id', 'the id is not a valid mongo id').isMongoId(),
        param('id').custom( userIdExist ),
        check('role').custom( validRole ),
        validateFields,
    ], usersPut
);

router.delete('/:id',[
    param('id', 'the id is not a valid mongo id').isMongoId(),
    param('id').custom( userIdExist ),
    validateFields,
], usersDelete );


module.exports = router;