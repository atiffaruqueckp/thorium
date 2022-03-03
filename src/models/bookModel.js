const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {

author_id: {
    type: ObjectId,
    ref: "author1"
},
publisher_id: {
    type: ObjectId,
    ref: "publisher1"
},
name: String,
price: Number,
isHardCover: {
    type: Boolean,
    default: false
}
}, { timestamps: true } );


module.exports = mongoose.model('book1', bookSchema)