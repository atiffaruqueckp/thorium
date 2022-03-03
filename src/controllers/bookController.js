const { count } = require("console")
const { collection } = require("../models/newAuthorModel")
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

const books = async function (req,res){
   
    let publisherId= await PublisherModel.find({name:{$in:["Harper Collins India", "Penguin"]}}).select({_id:1})
    let arr=[]
    arr=publisherId.map(e=>e._id)
    let data= await bookModel.updateMany(
                {publisher:{$in:arr}},
                {isHardCover:true},
                {new:true}
    )  
    let authorId= await AuthorModel.find({rating:{$gt:3.5}}).select({_id:1})
    let arr1=[]
    arr1=authorId.map(e=>e._id)
    let data1= await bookModel.updateMany(
        {author:{$in:arr1}},
        {$inc:{price:+10}},
        {new:true})
    let latestBooks= await bookModel.find()
    res.send(latestBooks);

}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.books = books
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
