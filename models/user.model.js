const mongoose= require("mongoose");

const schema = mongoose.Schema;

const userschema = new schema({
    name: {type: String, required: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, unique: true},
    phone_number: {type: Number, required: true, unique: true, minlength: 10 , maxlength: 10},
    created_by: {type: String, default: null},
    password: {type: String, required: true}
},{
    timestamps: true,
}
);

const user = mongoose.model('user', userschema)

module.exports = user;