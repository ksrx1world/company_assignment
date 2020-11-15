const router = require('express').Router();
let Usr = require('../models/user.model');
const bcrypt = require('bcrypt');
const requirelogin = require('../middleware/requireLogin.js');
    
//To get list of all the created users 
router.route('/users').get(requirelogin,(req, res) => {
    Usr.find()
    .then(usr => res.json(usr))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/protected').get(requirelogin,(req,res) => {
    res.json({msg: "this is the protected data"});
})

//To create user
router.route('/users').post((req, res) => {
    const {name, email, phone_number, created_by, password}= req.body

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
                const NewUsr= new Usr({
                    name, email, phone_number, created_by, password:hashedpassword
                });
                
                NewUsr.save()
                .then(() => res.status(200).json({msg: "user added", status: "success"}))
                .catch(err => res.status(404).json({msg: "some problem occur",Errorcode: err.code}))

            })
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
router.route('/users/:id').get(requirelogin,(req, res) => {
    Usr.findById(req.params.id)
    .then(usr => res.json(usr))
    .catch(err => res.status(404).json("Error: " + err));
});

// router.route('/delete/:id').delete((req, res) => {
//     Usr.findByIdAndDelete(req.params.id)
//     .then(() => res.json("user deleted"))
//     .catch(err => res.status(404).json("Error: " + err));
// });

// router.route('/update/:id').post((req ,res) => {
//     Usr.findById(req.params.id)
//     .then(usr =>
//         {
//             usr.username= req.body.username;

//             usr.save()
//             .then(()=> res.json("user updated"))
//             .catch(err =>res.json(err));

//         })
//         .catch(err => res.json(err));
// });



module.exports= router;