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
            res.json({msg: "invalid Email Id or password", status: 'fail'}) 
        }

        bcrypt.compare(password , saveduser.password)
        .then(domatch => {
            if(domatch)
            {
                const token = jwt.sign({_id:saveduser._id}, jwtsecret)
                res.status(200).json({msg: "successfully login", status: "success",token : token})
            }
            else
            {
                res.json({msg: "invalid Email Id or password", status: 'fail'})
            }
        })
        .catch(err => res.json(err))
    })

});

module.exports = router; 