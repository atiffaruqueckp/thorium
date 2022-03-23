//const { default: mongoose } = require("mongoose")
const CollegeModel = require("../models/CollegeModel")
const InternModel = require("../models/InternModel")
const ObjectId = require("mongoose").Types.ObjectId;

// validation//

const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}



// create intern//

const CreateIntern = async function (req, res) {
  try {

    let data = req.body;

    if (Object.keys(data).length > 0) {

      if (!isValid(data.email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }
      if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: " name is required" }) }
      if (!isValid(data.collegeId)) { return res.status(400).send({ status: false, msg: "College Id is required" }) }

      // if(data.collegeId>0)

      if (!ObjectId.isValid(data.collegeId)) { return res.status(400).send({ status: false, msg: "Please provide a valid College Id" }) }

      let CollegeCheckId = await CollegeModel.findOne({ _id: data.CollegeId, isDeleted: true })
      if (CollegeCheckId) { return res.status(400).send({ msg: "This college is not providing internship right now, check for other colleges internship" }) }

      if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
        return res.status(400).send({ status: false, msg: "Please provide a valid email" })
      }
      if (!(/^[6-9]\d{9}$/.test(data.mobile))) {
        return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" })
      }



      let dupli = await InternModel.findOne({ email: data.email })

      if (dupli) { return res.status(400).send({ status: false, msg: "Email already exists" }) }

      let dupliMobile = await InternModel.findOne({ mobile: data.mobile })

      if (dupliMobile) { return res.status(400).send({ status: false, msg: "Mobile Number already exists" }) }

      let savedData = await InternModel.create(data);
      return res.status(201).send({ InternDetails: savedData });

    } else {
      return res.status(400).send({ ERROR: "BAD REQUEST" })
    }

  } catch (err) {

    return res.status(500).send({ ERROR: err.message })

  }
}

module.exports.CreateIntern = CreateIntern