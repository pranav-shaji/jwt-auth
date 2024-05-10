const mongoose = require('mongoose')

productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        default:null

    },
    category:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true

    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount_price:{
        type:Number,
        default:0

    },
    description:{
        type:String,
        required:true,

        default:null
    },
    images:{
        type:Array,
        default:[]
    },
    priceUpdatedAt:{
        type:Date,
        default:new Date()
    }
},{
    timestamps:true
})

module.exports = mongoose.model("product",productSchema)