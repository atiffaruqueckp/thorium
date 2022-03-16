const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/AuthorModel")
const BlogModel= require("../models/BlogModel")

const createBlog= async function (req, res) {
try{
    let blog = req.body
    let id = blog.authorId;
    if(Object.keys(blog).length===0){
        return res.status(400).send({status:false,msg: "Wrong input"})
    }
    let authorCheck = await AuthorModel.findOne({_id:{$eq:id}});
    
    if (authorCheck===null){
        return res.status(400).send("Author do not exist.")
    }else{
    let blogCreated = await BlogModel.create(blog)
    res.status(201).send({data: blogCreated})
    }
}catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}
}

const getBlogs= async function (req, res) {
try{
    let filter = req.query;
    if(filter.tags==undefined && filter.subcategory==undefined){
        let blogs = await BlogModel.find({$and:[filter,{isDeleted:false},{isPublished: true}]}).populate("authorId")
        return res.status(200).send({data: blogs})
    }
    if(filter.tags!=undefined && filter.subcategory==undefined){
        let tags = filter.tags
        delete filter.tags;
        let blogs = await BlogModel.find({$and:[{tags:{$in:[tags]}},filter,{isDeleted:false},{isPublished: true}]}).populate("authorId")
        return res.status(200).send({data: blogs})
    }
    if(filter.tags==undefined && filter.subcategory!=undefined){
        let subCat = filter.subcategory
        delete filter.subcategory;
        let blogs = await BlogModel.find({$and:[{subcategory:{$in:[subCat]}},filter,{isDeleted:false},{isPublished: true}]}).populate("authorId")
        return res.status(200).send({data: blogs})
    }
    if(filter.tags!=undefined && filter.subcategory!=undefined){
        let subCat = filter.subcategory
        let tags = filter.tags
        delete filter.subcategory;
        delete filter.tags
        let blogs = await BlogModel.find({$and:[{subcategory:{$in:[subCat]}},{tags:{$in:[tags]}},filter,{isDeleted:false},{isPublished: true}]}).populate("authorId")
        return res.status(200).send({data: blogs})
    }
}catch(error){
        return res.status(500).send({msg: "Error", error:error.message})
    }
}

const updateBlogs = async function (req,res){
try{
    let id = req.params.blogsId;
    if(id === undefined){
        return res.status(400).send({status:false, msg: "Please provide the blog's ID"})
    }
    let updation = req.body;
    if(Object.keys(updation).length===0){
        return res.status(400).send({status:false, msg: "Please provide the update data"})
    }
    let blogs = await BlogModel.findOneAndUpdate({$and:[{_id:id},{isDeleted:false}]},updation,{new:true})
    if(blogs==null){
        return res.status(400).send({status:false,msg:"No such blog."})
    }
    if(blogs.isPublished==true){
        let publishedBlog = await BlogModel.findOneAndUpdate({_id:id},{publishedAt: Date.now()},{new:true})
        return res.status(200).send({status: true, msg: publishedBlog});
    }
    return res.status(200).send({status:true, msg: blogs})
}catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}
}

const deleteBlogs = async function(req,res){
try{
    let id = req.params.blogsId
    // console.log(id)
    let blogs = await BlogModel.findOneAndUpdate({$and:[{_id:id},{isDeleted:false}]},{$set:{isDeleted:true, deletedAt: Date.now()}},{new:true})
    if(blogs===null){
        return res.status(404).send({status:false, msg:"not found"});
    }else{
        return res.status(200).send({status: true, msg:"done"})
    }
}catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}

}

const deleteCategory= async function(req,res)
{
        
    try{
        let filter=req.query;
        let data= await BlogsModel.findOneAndUpdate({filter},
            {$set:{isDeleted:true,deletedAt:Date.now()}},
            {new:true})
        if(data.length===0)
        {
            return res.status(404).send({status:false,msg:"No data found"})    
        }
        if(filter.tags==undefined && filter.subcategory==undefined){
            let blogs = await BlogsModel.findOneAndUpdate({filter},
                {$set:{isDeleted:true,deletedAt:Date.now()}},
                {new:true})
            return res.status(200).send({ status:true,msg: "deleted"})
        }
        if(filter.tags!=undefined && filter.subcategory==undefined){
            let tags = filter.tags
            delete filter.tags;
            let blogs = await BlogsModel.findOneAndUpdate({$and:[{tags:{$in:[tags]}},filter]},
                {$set:{isDeleted:true,deletedAt:Date.now()}},
                {new:true})
                return res.status(200).send({ status:true,msg: "deleted"})
        }
        if(filter.tags==undefined && filter.subcategory!=undefined){
            let subCat = filter.subcategory
            delete filter.subcategory;
            let blogs = await BlogsModel.findOneAndUpdate({$and:[{subcategory:{$in:[subCat]}},filter]},
                {$set:{isDeleted:true,deletedAt:Date.now()}},
                {new:true})
                return res.status(200).send({ status:true,msg: "deleted"})
        }
        if(filter.tags!=undefined && filter.subcategory!=undefined){
            let subCat = filter.subcategory
            let tags = filter.tags
            delete filter.subcategory;
            delete filter.tags
            let blogs = await BlogsModel.findOneAndUpdate({$and:[{tags:{$in:[tags]}},{subcategory:{$in:[subCat]}},filter]},
                {$set:{isDeleted:true,deletedAt:Date.now()}},
                {new:true})
                return res.status(200).send({ status:true,msg: "deleted"})
        }
    }   
catch(error){
    return res.status(500).send({msg: "Error", error:error.message})
}
}

const loginAuthor = async function (req, res) {
try{
    let email = req.body.email;
    let password = req.body.password;
    if(!email||!password){
        res.status(400).send({msg:"Please input both email and password."})
    }
    let author = await AuthorModel.findOne({ email: email, password: password });
        if (!author)
        return res.status(404).send({
            status: false,
            msg: "email or the password is not correct",
        });
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
module.exports.createBlog= createBlog
module.exports.getBlogs= getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteCategory = deleteCategory
module.exports.loginAuthor = loginAuthor