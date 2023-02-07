const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least five characters').isLength({min:5}),
], async(req,res)=>{
    const errors = validationResult(req);
    //If there are errors, return Bad request and errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //check whether the user with this email exists already
    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({errors: "sorry a user with this email already exists"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
     })
     res.json({user})
    }
     catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
     }

     //there can be others errors not only dplicate email
    //.then(user => res.json(user))
    // .catch(err => {console.log(err),
    // res.json({error: 'Please enter a unique Email value', message: err.message})})
    
    //simplest way to create and save data in mongodb
    // console.log(req.body)
    // const user = User(req.body)
    // await user.save()

})

module.exports = router;