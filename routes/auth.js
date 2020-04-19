const express= require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

//!load user
router.get('/', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.data.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.json({msg:'User not found'})
    }
})


//!user login
router.post('/', [
    check('email', 'Enter valied email').isEmail(),
    check('password', 'Enter the password at least 6 characters').isLength({min:6})
],async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        
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
                res.json({token})
            }
        )
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }

})

module.exports = router;