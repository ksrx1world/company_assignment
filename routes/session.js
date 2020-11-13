const router = require('express').Router();
let Usr = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

jwtsecret = process.env.JWT_SECRET;

router.route('/session').post((req, res) => {
    const {email, password} = req.body

    if(!email || ! password){
        res.status(422).json("Please enter all details")
    }
    Usr.findOne({email: email})
    .then((saveduser) => {
        if (!saveduser)
        { 
            res.status(422).json({error: 'Invalid Email or Password'}) 
        }

        bcrypt.compare(password , saveduser.password)
        .then(domatch => {
            if(domatch)
            {
                const token = jwt.sign({_id:saveduser._id}, jwtsecret)
                res.status(200).json({token : token})
            }
            else
            {
                res.status(422).json({error: 'Invalid Email or Password'})
            }
        })
        .catch(err => res.json(err))
    })

});

module.exports = router; 