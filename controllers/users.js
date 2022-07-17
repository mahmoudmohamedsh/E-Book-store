const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('validation faild');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcryptjs.hash(password,12).then(hashedpass=>{
        const user = new User({email:email,password:hashedpass,name:name});
        return user.save();
        }).then(result=>{
            res.status(201).json({message:'user created',uerId:result._id});
        }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
    
}


exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                const error = new Error('user could not found');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcryptjs.compare(password,user.password);

        })
        .then(equal=>{
            if(!equal){
                const error = new Error('user could not found');
                error.statusCode = 401;
                throw error;
            }
            //make jwt and send it
            const token = jwt.sign({
                email:loadedUser.email,
                userId:loadedUser._id.toString()
            },'verylongsecretkey',{expiresIn:'1h'})

            res.status(200).json({token:token,userId:loadedUser._id.toString()});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}