const mongoose = require('mongoose');

cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    products:{
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true
                
                },
                count:{
                    type:Number,
                    required:true
                }
            }
        ],
        required:true
    }

})

module.exports= mongoose.model('cart',cartSchema)