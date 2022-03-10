const jwt = require("jsonwebtoken");

let authenticate= function (req,res,next){
    try{
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
      let decodedToken = jwt.verify(token, "functionup-thorium")
        if(!decodedToken)
        return res.status(400).send({status: false, msg: "token is invalid"});
        next()
    } catch(error) {
        res.status(500).send({msg:"Error", err: error.message })
}
}


let authorise= function (req,res,next){
    try{
    let token= req.headers["x-auth-token"];
    let decodedToken= jwt.verify(token, "functionup-thorium")
    let toBeUpdatedUserId= req.params.userId;
    let loggedInUserId= decodedToken.userId;
    if(loggedInUserId != toBeUpdatedUserId) return res.status(400).send({status:false, msg:"you are not authorized to perform this task"})
    next()
    } catch(error) {
        res.status(500).send({msg:"Error", err:error.message})
    }
}


module.exports.authenticate= authenticate
module.exports.authorise= authorise