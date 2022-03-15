const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "iamtheowner");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });

        next();
    } catch (error) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authenticate = authenticate;