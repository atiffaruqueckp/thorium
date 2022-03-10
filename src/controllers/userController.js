const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try{
      let data = req.body;
      console.log(data)
      if ( Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData })
    }
    else {
        res.status(400).send({ msg: "BAD REQUEST"})
    }
}
  catch(error) {
      console.log("This is the error:", error.message)
      res.status(500).send({msg: "Error", err: error.message})
  }
}





const loginUser = async function (req, res) {
    try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
}
catch(error) {
    console.log("This is the error:", error.message)
    res.status(500).send({msg: "Error", err: error.message})
}
}





const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
//   if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);
  
//   let decodedToken = jwt.verify(token, "functionup-thorium");
//   if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(400).send({ status: false, msg: "No such user exists" });

  res.status(201).send({ status: true, data: userDetails });
};





const updateUser = async function (req, res) {

//   let token = req.headers["x-Auth-token"];
//   if (!token) token = req.headers["x-auth-token"];
//   if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(400).send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:userData},{new:true});
  res.status(201).send({ status: updatedUser, data: updatedUser });
};





const postMessage = async function (req, res) {
    let message = req.body.message
    
    // let token = req.headers["x-auth-token"]
    // if(!token) return res.send({status: false, msg: "token must be present in the request header"})
    // let decodedToken = jwt.verify(token, 'functionup-thorium')

    // if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
    //userId for which the request is made. In this case message to be posted.
    // let userToBeModified = req.params.userId
    //userId for the logged-in user
    // let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    // if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.status(400).send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.status(201).send({status: true, data: updatedUser})
}





const deleteUser = async function(req,res) {

//   let token = req.headers["x-Auth-token"];
// if (!token) token = req.headers["x-auth-token"];
// if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);
  
  let userId = req.params.userId;
  let userss = await userModel.findById(userId);
  if(!userss) {
    return res.status(400).send("No such user exists");
  }

  let deleteUser = await userModel.updateMany({ _id: userId}, { isDeleted: true});
  res.status(201).send({data: deleteUser })
};



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;