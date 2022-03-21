const InternModel = require("../models/InternModel")




const InternData = async function (req, res) {
    try {

        let data = req.body;

        if (data) {
            let email = data.email

            let mobileNumber = data.mobile

            if (email && mobileNumber) {
                if (/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)) {

                    if (/^([+]\d{2})?\d{10}$/.test(mobileNumber)) {

                        let savedData = await InternModel.create(data);
                        return res.status(201).send({ Data: savedData });

                    } else {
                        return res.status(400).send("Mobile number must contain 10 Digits")
                    }
                } else {
                    return res.status(400).send("not a valid email")
                }
            } else {
                return res.status(400).send("email or password is empty")
            }

        }

        else { return res.status(400).send("BAD REQUEST") }

    } catch (err) {

        return res.status(500).send({ ERROR: err.message })

    }
}





module.exports.InternData = InternData;