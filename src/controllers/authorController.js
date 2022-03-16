const jwt = require("jsonwebtoken");
const AuthorModel= require("../models/AuthorModel");
const validator = require("email-validator");

const createAuthor= async function (req, res) {
try{
        let author = req.body
        if(Object.keys(author).length ===0){
            return res.status(400).send({status:false, msg: "Please provide proper author details."})
        }
        let email = author.email;
        if((validator.validate(email)== false)){
            return res.status(400).send({status:false, msg: "Please input a valid email"})
        }
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({status: true, data: authorCreated})
}catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}
}


const loginAuthor = async function (req, res) {
    try{
        let email = req.body.email;
        let password = req.body.password;
        if(!email||!password){
            return res.status(400).send({msg:"Please input both email and password."})
        }
        let author = await AuthorModel.findOne({ email: email, password: password });
            if (!author){
                return res.status(404).send({
                    status: false,
                    msg: "email or the password is not correct",
                });
            }
        let token = jwt.sign(
            {
                authorId: author._id.toString()
            },
            "iamtheowner"
        );
        res.setHeader("x-api-key", token);
        return res.status(201).send({ status: true, data: token });
    }catch(error){
        return res.status(500).send({ msg: "Error", error: error.message })
    }
    };


module.exports.loginAuthor = loginAuthor
module.exports.createAuthor= createAuthor
