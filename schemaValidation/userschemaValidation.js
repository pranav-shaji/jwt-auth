
const mongoose = require("mongoose")

let userschema= mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    
    },
    otp:{
        type:String,
        default:null
    },

},{timestamps:true});

module.exports = mongoose.model("people",userschema)