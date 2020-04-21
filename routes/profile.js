const express= require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/HotelProfile');
const User = require('../models/User');




//!Create profile for hotel
router.post('/',[auth, [
    check('name' , 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('popularcity', 'popularcity is required').not().isEmpty(),
    check('phonenumber' , 'phonenumber is required').not().isEmpty(),
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
        console.log('have a profile for you')
        res.json('Have a profile for you');
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
});

router.put('/edit-profile',[auth, [
    check('name' , 'name is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('popularcity', 'popularcity is required').not().isEmpty(),
    check('phonenumber' , 'phonenumber is required').not().isEmpty(),
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }

    const {name, address, popularcity, todaybestoffer, description,phonenumber} = req.body;

    try {
        let profile = await Profile.findOne({user:req.data.user.id})
        if(profile){
            profile.name = name;
            profile.address = address;
            profile.popularcity = popularcity;
            profile.todaybestoffer = todaybestoffer;
            profile.description = description;
            profile.phonenumber = phonenumber;

            await profile.save();
    
            res.json(profile);
        }
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
        const profiles = await Profile.find().populate('user', ['email']);
        res.json(profiles);
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

//!Upload the profile picture
router.put('/profilepicture' , auth ,async (req,res)=>{
    const {profilePictureUrl} = req.body;
    console.log(profilePictureUrl)
    try {
        const profile = await Profile.findOne({user:req.data.user.id});
        profile.profilepicture = profilePictureUrl;

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.json('server error');
    }
})


//!Get profile by id
router.get('/hotel/:id',async (req,res)=>{
    try {
        const profile = await Profile.findById(req.params.id);
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.json('Server error');
    }
})

//!Get profile
router.get('/myProfile', auth, async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.data.user.id}).populate('user', ['name']);
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.json('Server error')
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