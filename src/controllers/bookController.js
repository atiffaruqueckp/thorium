const { count } = require("console")
const authorModel = require("../models/authorModel.js")
const bookModel= require("../models/bookModel.js")
const publisherModel= require("../models/publisherModel.js")
const mongoose = require("mongoose");


const createBook= async function (req, res) {
    let authorId = req.body.author_id
    let publisherId = req.body.publisher_id
    
    const authorDetails = await authorModel.findById(authorId)
    const publisherDetails = await publisherModel.findById(publisherId)

    if(req.body.hasOwnProperty("author_id")) {
        if(authorDetails === undefined) {
            return res.send({msg: "Author is not present"})
        } else {
            if(req.body.hasOwnProperty("publisher_id")) {
                if(publisherDetails === undefined) {
                    return res.send({msg: "Publisher is not present"})
                } else {
                    let bookCreated = await bookModel.create(req.body)
                    return res.send({data: bookCreated})
                }
            } else {
                return res.send({msg: "Publisher id is required"})
            }
        }
    }
    else {
        return res.send({msg: "Author id is required"})
    }
}

const getBooksWithAuthor = async function (req, res) {
    let allBooks = await bookModel.find().populate('author_id').populate('publisher_id');
    res.send({data: allBooks});
};


module.exports.createBook= createBook
module.exports.getBooksWithAuthor = getBooksWithAuthor