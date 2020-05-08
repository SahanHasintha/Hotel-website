const express = require('express');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();


router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','Please enter the password at least 6 characters').isLength({min:6})
],async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    console.log(req.body);
    const {name, email, password} = req.body
        const newObj = {
            name,
            email,
            password
        }

    try {
        let user =await  User.findOne({email});
        if(user){
            return res.status(400).json({msg:'user already exists'});
        }
        user = new User(newObj);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
    const payload= {
        user : {
            id: user._id
        }
    }

    jwt.sign(
        payload,
        "mysecrettoken",
        {expiresIn:3600},
        (error, token)=>{
            if(error) throw error;
            return res.json({token})
        }
    )

    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
})

module.exports = router;