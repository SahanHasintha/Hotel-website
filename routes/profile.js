const express= require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/HotelProfile');
const User = require('../models/User');




//!Create profile for hotel
router.post('/',[auth, [
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('popularcity').not().isEmpty(),
    check('phonenumber').not().isEmpty(),
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }

    const {name, address, popularcity, todaybestoffer, description,phonenumber} = req.body;
    const user = req.data.user.id;
    const newObj = {
        user,
        name, 
        address, 
        popularcity, 
        todaybestoffer, 
        description,
        phonenumber
    };

    try {
        let profile = await Profile.findOne({user:req.data.user.id})
        if(!profile){
            profile = new Profile(newObj);

            await profile.save();
    
            res.json(profile);
        }
        res.json('Have a profile for you');
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
});

//!Delete the hotel profile
router.delete('/', auth ,async (req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.data.user.id});
        await User.findByIdAndRemove(req.data.user.id);
        res.json('Profile removed');
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
});


//!Get All Profiles
router.get('/',async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json({profiles});
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
})

//!Add rooms
router.put('/rooms',[auth, [
    check('price', 'price is required').not().isEmpty(),
    check('ac','a/c or non a/c required').not().isEmpty(),
    check('category','category is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {price,facilities,ac,description, category} = req.body;
    const newObj = {price,facilities,ac,description, category}
    try {
        const profile = await Profile.findOne({user:req.data.user.id});

        profile.rooms.unshift(newObj);

        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
})

//!Upload the imageUrl
router.put('/profilepicture' , auth ,async (req,res)=>{
    const {profilePictureUrl} = req.body;

    try {
        const profile = await Profile.findOne({user:req.data.user.id});
        profile.profilepicture = profilePictureUrl;

        await profile.save();
        res.json({profile});
    } catch (err) {
        console.log(err.message);
        res.json('server error');
    }
})


//!Add foods to restuarant
router.put('/restuarant',[auth, [
    check('foodname', 'Food name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({errors:errors.array()});
    }
    const {foodname, price, description} = req.body;
    const newObj = {foodname, price, description};

    try {
        const profile = await Profile.findOne({user:req.data.user.id});

        profile.restuarant.unshift(newObj);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
});


//!Remove the food from restuarant
router.delete('/restuarant/:foodId',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.data.user.id});
        const index = profile.restuarant.map(rest=>rest.id).indexOf(req.params.foodId);
        profile.restuarant.splice(index,1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
})


//!Remove the room in rooms
router.delete('/rooms/:roomId',auth , async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.data.user.id});
        const removeIndex = profile.rooms.map(room => room.id).indexOf(req.params.roomId);

        profile.rooms.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.log(err,message);
        res.json('server error');
    }
})
module.exports = router;