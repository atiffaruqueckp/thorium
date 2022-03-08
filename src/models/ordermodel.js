const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectID
const orderSchema = new mongoose.Schema( {
    userId:{
        type: ObjectID,
        ref: "userNew1"
    },
    productId: {
        type : ObjectID,
        ref: "product"
    },
        amount: Number,
        isFreeAppUser:{
                type: Boolean,
                default: true
        }, 
        date:{
            type: Date,
            default: Date.now
        } 
        }, {timestamps: true});


module.exports = mongoose.model('order', orderSchema)