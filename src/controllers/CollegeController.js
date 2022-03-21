const CollegeModel = require("../models/CollegeModel")
const InternModels = require("../models/InternModel")



const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// create college controller

const CreateCollege = async function (req, res) {

    try {
        const data = req.body;

        if (Object.keys(data).length > 0) {

            if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }
            if (!isValid(data.fullName)) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }

            //if((/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(data.logoLink))){    

            const savedData = await CollegeModel.create(data)

            return res.status(201).send({ status: "College Created", savedData })

            // }else{res.send({msg : "please enter a valid URL"})}

        } else { res.send({ msg: "please enter some data" }) }

    } catch (err) {
        return res.status(500).send({ ERROR: err.message })
    }
}

module.exports.CreateCollege = CreateCollege