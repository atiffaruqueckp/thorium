const { count } = require("console")
const authorModel = require("../models/authorModel.js")
const bookModel= require("../models/bookModel.js")
const publisherModel= require("../models/publisherModel.js")
const mongoose = require("mongoose");


const createBook= async function (req, res) {
    let book = req.body
    const bookDetails = await bookModel.create(book)
    return res.send({msg: bookDetails})

};

const hardCover = async function (req, res) {
    let allBooks = await publisherModel.find({name: {$in: ["Penguin", "HarperCollins"] } } )
    let same = []
    for(let i=0; i<allBooks.length; i++)
        same.push(allBooks[i]._id)
    let books = await bookModel.updateMany(
        {publisher_id: {$in: same } },
        {$set: req.body},
        {$new: true}
    )
    res.send({data: books});    
    }

    const ratings = async function(req, res) {
        let ratings = await authorModel.find( { rating: {$gt: 3.5} } )
        let same = []
        for(let i=0; i<ratings.length; i++)
        same.push(ratings[i]._id)
        let newBooks = await bookModel.updateMany(
            {author_id: {$in: same}},
            {$inc: req.body},
            {$new: true}
        )
        let bookss = await bookModel.find({ author_id: {$in: same} } )
        return res.send({msg: bookss})
    }


module.exports.createBook= createBook
module.exports.hardCover = hardCover
module.exports.ratings = ratings