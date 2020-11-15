const jwt = require('jsonwebtoken')
require('dotenv').config();
jwtsecret = process.env.JWT_SECRET;
let Usr = require('../models/user.model');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
       return res.status(401).json({msg:"you must be logged in", status: 'fail'})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtsecret,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Usr.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}
