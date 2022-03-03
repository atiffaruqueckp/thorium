const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName: String,
    age:Number,
    rating: Number

},
{ timestamps: true }
);

module.exports = mongoose.model('author1', authorSchema)