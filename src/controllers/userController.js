const userModel = require("../models/usermodel")

const createUser= async function (req, res) {
    let  userdata = req.body
    let user = await userModel.create(userdata)
    res.send({msg: user})
}
 




module.exports.createUser = createUser

