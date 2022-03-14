const AuthorModel= require("../models/AuthorModel");
const validator = require("email-validator");

const createAuthor= async function (req, res) {
    let author = req.body
    let email = author.email;
    if((validator.validate(email)== false)){
        return res.status(400).send({msg: "Please input a valid email"})
    }
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})
}

const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.status(200).send({data: authors})
}

module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData