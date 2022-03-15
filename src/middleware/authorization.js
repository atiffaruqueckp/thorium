const jwt = require("jsonwebtoken");

const authCheck = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "iamtheowner");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
        let authorId = req.params.authorId;
        console.log(authorId, decodedToken.authorId)
        if (authorId != decodedToken.authorId) return res.status(401).send({ status: false, msg: "You are not authorized to access this part." })
        next();
    } catch (error) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authCheck = authCheck;