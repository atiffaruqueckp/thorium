
const AuthorModel = require("../models/AuthorModel")
const BlogModel= require("../models/BlogModel")

const createBlog= async function (req, res) {
    let blog = req.body
    let id = blog.authorId;
    let authorCheck = await AuthorModel.findOne({_id:{$eq:id}});
    
    if (authorCheck===null){
        return res.status(400).send("Author do not exist.")
    }else{
    let blogCreated = await BlogModel.create(blog)
    res.status(201).send({data: blogCreated})
    }
}

const getBlogs= async function (req, res) {
    let filter = req.query;
    let blogs = await BlogModel.find({$and:[filter,{isDeleted:false},{isPublished: true}]}).populate("authorId")
    res.status(200).send({data: blogs})
}

const updateBlogs = async function (req,res){
    let id = req.params.blogsId;
    let updation = req.body;
    let blogs = await BlogModel.findOneAndUpdate({$and:[{_id:id},{isDeleted:false}]},updation,{new:true})
    if(blogs==null){
        return res.status(400).send({msg:"No such blog."})
    }
    if(blogs.isPublished==true){
        let publishedBlog = await BlogModel.findOneAndUpdate({_id:id},{publishedAt: Date.now()},{new:true})
        return res.status(200).send({msg: publishedBlog});
    }
    return res.status(200).send({msg: blogs})
}

const deleteBlogs = async function(req,res){
    let id = req.params.blogsId
    // console.log(id)
    let blogs = await BlogModel.findOneAndUpdate({$and:[{_id:id},{isDeleted:false}]},{$set:{isDeleted:true, deletedAt: Date.now()}},{new:true})
    if(blogs===null){
        return res.status(404).send({msg:"not found"});
    }else{
        return res.status(200).send({msg:"done"})
    }

}

const deleteCategory = async function(req,res){
    let filters = req.query
    let blogs = await BlogModel.updateMany({$and:[filters,{isDeleted:false}]},{$set:{isDeleted:true,deletedAt: Date.now()}})
    if(blogs===null){
        return res.status(404).send({msg:"not found"});
    }else{
        return res.status(200).send({msg:"done"})
    }
}
module.exports.createBlog= createBlog
module.exports.getBlogs= getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteCategory = deleteCategory