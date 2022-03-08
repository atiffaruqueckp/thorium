const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    name : String,
    category: String,
    price:{
        type: Number,
        require:true}
    
        }, {timestamp:true});


module.exports = mongoose.model('product', productSchema) //users