const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let newAuthor = req.body
    let authorCreated = await AuthorModel.create(newAuthor)
    res.send({data: authorCreated})
}

module.exports.createAuthor= createAuthor