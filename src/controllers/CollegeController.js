const CollegeModel = require("../models/CollegeModel")
const InternModel = require("../models/InternModel")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidname = function (value) {
    if (!(value === value.toLowerCase())) {
        return false
    }                        
    return true
}

const CreateCollege = async function (req, res) {

    try {
        const data = req.body;

        if (Object.keys(data).length > 0) {

            if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }
            if (!isValid(data.fullName)) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }
            if (!isValid(data.logoLink)) { return res.status(400).send({ status: false, msg: "logoLink is required" }) }
            if (!isValidname(data.name)) { return res.status(400).send({ status: false, msg: "lowercase is required" }) }


            let checkNameCollege = await CollegeModel.findOne({ name: data.name })
            if (checkNameCollege) { return res.status(400).send({ msg: "Name Already exist" }) }


            const savedData = await CollegeModel.create(data)

            return res.status(201).send({ status: "College Created", savedData })



        } else { res.status(400).send({ msg: "please enter some data" }) }

    } catch (err) {
        return res.status(500).send({ ERROR: err.message })
    }
}
const CollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        if (!collegeName) { return res.status(400).send({ status: false, ERROR: "Please provide collegeName in query" }) }
        let resCollege = await CollegeModel.findOne({ name: collegeName })
        if (!resCollege) { return res.status(404).send({ status: false, Error: "no college found" }) }

        let presentIntern = await InternModel.find({ collegeId: resCollege._id })
        //if(collegeId!=resCollege._id ){return res.status(400).send({status: false, msg: "Id not match"})}

        let result = { name: resCollege.name, fullName: resCollege.fullName, logoLink: resCollege.logoLink }
        if (presentIntern.length > 0) {
            result["Interest"] = presentIntern  //convert in Array

            return res.status(200).send({ data: result })
        }

        if (presentIntern.length == 0) {
            result["Interest"] = "no intern for now";
            return res.status(200).send({ data: result })
        }


    } catch (err) {
        return res.status(500).send({ ERROR: err.message })
    }

}

module.exports.CreateCollege = CreateCollege
module.exports.CollegeDetails = CollegeDetails