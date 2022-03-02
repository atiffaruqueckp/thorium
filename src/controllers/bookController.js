const { count } = require("console")
const AuthorModel = require("../models/newAuthorModel")
const bookModel= require("../models/newBookModel")
const PublisherModel= require("../models/newPublisherModels")

const createBook= async function (req, res) {
    let book = req.body
    let id = book.author;
    let pubId = book.publisher;
    let authorCheck = await AuthorModel.findOne({_id:{$eq:id}});
    let publisherCheck = await PublisherModel.findOne({_id:{$eq:pubId}});
    
    if(id===undefined || pubId===undefined){
        return res.send("Please provide Publisher and Author details.")
    }else if (authorCheck===null || publisherCheck===null){
        return res.send("Author or Publisher do not exist.")
    }else{
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
    }
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate(["author","publisher"])
    res.send({data: books})
}

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
