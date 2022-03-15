const AuthorModel = require("../models/AuthorModel");
const validator = require("email-validator");

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (Object.keys(author).length === 0) {
            return res.status(400).send({ status: false, msg: "Please provide proper author details." })
        }
        let email = author.email;
        if ((validator.validate(email) == false)) {
            return res.status(400).send({ msg: "Please input a valid email" })
        }
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })
    } catch (error) {
        return res.status(500).send({ msg: "Error", error: error.message })
    }
}

const getAuthorsData = async function (req, res) {
    try {
        let authors = await AuthorModel.find()
        res.status(200).send({ data: authors })
    } catch (error) {
        return res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.getAuthorsData = getAuthorsData