const express = require('express');
const usersController = require('../controllers/users');
const {body} = require('express-validator');
const User = require('../models/user');


const router = express.Router();

//Post /user/login
router.post('/signup',
    [
    body('email').isEmail().withMessage('please enter valid email').custom(
        (value,{req})=>{
            return User.findOne({email:value}).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('email address already exist !');
                }
            });
        }).normalizeEmail(),
        body('password').trim().isLength({min:5}),
        body('name').trim().notEmpty(),
    ],
    usersController.signup);

router.post('/login',usersController.login);

module.exports = router;