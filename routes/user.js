const jwt = require('jsonwebtoken')
const router = require('express').Router();
let Usr = require('../models/user.model');
const bcrypt = require('bcrypt');
const requirelogin = require('../middleware/requireLogin.js');
jwtsecret = process.env.JWT_SECRET;



// if a user has created 5 users
// then after login that user will be seeing those 5 users only and not the users created by others.
router.route('/users/:token').get(requirelogin,(req, res) => {
    jwt.verify(req.params.token,jwtsecret,(err,payload)=>{
        if(err){
         return  res.status(401);
        }
        const {_id} = payload;
        Usr.findById(_id).then(userdata=>{
            created_by = userdata.email;
            Usr.find({created_by:created_by})
            .then(usr => res.json(usr))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        
    }) 
    })
    


//To create user
router.route('/users').post((req, res) => {
    var {name, email, phone_number, created_by, password, token}= req.body

    if (!name || !email || !password || !phone_number) {
        res.status(422).json("please enter all fields")
    } 

    Usr.findOne({$or: [{email:email}, {phone_number: phone_number}]})
        .then((savedusr) => {
            if(savedusr){
                res.json({msg: "User already added", status: "fail"})
            }
            bcrypt.hash(password, 10)
            .then(hashedpassword => {
                if (token){
                    jwt.verify(token,jwtsecret,(err,payload)=>{
                        if(err){
                         return  res.status(401);
                        }
                        const {_id} = payload
                        Usr.findById(_id).then(userdata=>{
                            created_by = userdata.email;
                            const NewUsr= new Usr({
                                name, email, phone_number, created_by, password:hashedpassword
                            });
                            NewUsr.save()
                            .then(() => res.status(200).json({msg: "user added", status: "success"}))
                            .catch(err => res.status(404).json({msg: "some problem occur",Errorcode: err.code}))

                        }) 
                    })}
                else{
                const NewUsr= new Usr({
                    name, email, phone_number, created_by, password:hashedpassword
                });
                
                NewUsr.save()
                .then(() => res.status(200).json({msg: "user added", status: "success"}))
                .catch(err => res.status(404).json({msg: "some problem occur",Errorcode: err.code}))

            }})
            .catch((err) => {
                res.json(err)
            })
    
        })
        .catch((err) => {
            res.json(err)
        })


});

// To Update the user
router.route('/users/:id').put(requirelogin,(req ,res) => {
    Usr.findOneAndUpdate({_id: req.params.id}, {name: req.body.name,email: req.body.email,phone_number: req.body.phone_number })
    .then(() => res.status(200).json({msg: "user Updated", status: "success"}))
        .catch(err => {
            if(String(err).indexOf('E11000') !== -1){
                res.json({msg: "User Email or phone Number Already Exist", status: "fail"}) 
            }
                        res.json("Error: " + err)});
});

// To Delete the user
router.route('/users/:id').delete(requirelogin,(req, res) => {
    Usr.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: "user deleted", status:"success"}))
    .catch(err => res.status(404).json("Error: " + err));
});




// TO get single user data from object Id as param
router.route('/user/:id').get(requirelogin,(req, res) => {
    Usr.findById(req.params.id)
    .then(usr => res.json(usr))
    .catch(err => res.status(404).json("Error: " + err));
});





module.exports= router;