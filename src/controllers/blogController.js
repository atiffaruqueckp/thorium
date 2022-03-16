const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/AuthorModel");
const BlogModel = require("../models/BlogModel");

const createBlog = async function (req, res) {
  try {
    let blog = req.body;
    let id = blog.authorId;
    if (Object.keys(blog).length === 0) {
      return res.status(400).send({ status: false, msg: "Wrong input" });
    }
    let authorCheck = await AuthorModel.findOne({ _id: { $eq: id } });

    if (authorCheck === null) {
      return res
        .status(400)
        .send({ status: false, msg: "Author do not exist." });
    } else {
      let blogCreated = await BlogModel.create(blog);
      res.status(201).send({ status: true, data: blogCreated });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error", error: error.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let filter = req.query;
    if (Object.keys(filter).length === 0) {
      let blogs = await BlogModel.find({
        $and: [{ isDeleted: false }, { isPublished: true }],
      }).populate("authorId");
      if (blogs.length === 0) {
        return res.status(404).send({ status: false, msg: "Blogs not found." });
      }
      return res.status(200).send({ status: true, data: blogs });
    }
    if (filter.tags == undefined && filter.subcategory == undefined) {
      let blogs = await BlogModel.find({
        $and: [filter, { isDeleted: false }, { isPublished: true }],
      }).populate("authorId");
      if (blogs.length === 0) {
        return res.status(404).send({ status: false, msg: "Blogs not found." });
      }
      return res.status(200).send({ status: true, data: blogs });
    }
    if (filter.tags != undefined && filter.subcategory == undefined) {
      let tags = filter.tags;
      delete filter.tags;
      let blogs = await BlogModel.find({
        $and: [
          { tags: { $in: [tags] } },
          filter,
          { isDeleted: false },
          { isPublished: true },
        ],
      }).populate("authorId");
      if (blogs.length === 0) {
        return res.status(404).send({ status: false, msg: "Blogs not found." });
      }
      return res.status(200).send({ status: true, data: blogs });
    }
    if (filter.tags == undefined && filter.subcategory != undefined) {
      let subCat = filter.subcategory;
      delete filter.subcategory;
      let blogs = await BlogModel.find({
        $and: [
          { subcategory: { $in: [subCat] } },
          filter,
          { isDeleted: false },
          { isPublished: true },
        ],
      }).populate("authorId");
      if (blogs.length === 0) {
        return res.status(404).send({ status: false, msg: "Blogs not found." });
      }
      return res.status(200).send({ status: true, data: blogs });
    }
    if (filter.tags != undefined && filter.subcategory != undefined) {
      let subCat = filter.subcategory;
      let tags = filter.tags;
      delete filter.subcategory;
      delete filter.tags;
      let blogs = await BlogModel.find({
        $and: [
          { subcategory: { $in: [subCat] } },
          { tags: { $in: [tags] } },
          filter,
          { isDeleted: false },
          { isPublished: true },
        ],
      }).populate("authorId");
      if (blogs.length === 0) {
        return res.status(404).send({ status: false, msg: "Blogs not found." });
      }
      return res.status(200).send({ status: true, data: blogs });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error", error: error.message });
  }
};

const updateBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogsId;
    let body = req.body;
    if (Object.keys(body).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter Data to update." });
    }
    let validBlog = await BlogModel.findOne({
      $and: [{ _id: blogId }, { isDeleted: false }],
    })
    if (!validBlog) {
      return res.status(404).send({ status: false, msg: "Blog not found." });
    }
    let tagsUpdates = body.tags;
    let subCatUpdates = body.subcategory;
    if (tagsUpdates === undefined && subCatUpdates === undefined) {
      let updations = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: body },
        { new: true }
      );
      if (updations.isPublished == true) {
        let publishDate = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          { publishedAt: Date.now() },
          { new: true }
        );
        return res.status(200).send({ status: true, data: publishDate });
      }
      return res.status(200).send({ status: true, data: updations });
    }
    if (tagsUpdates !== undefined && subCatUpdates === undefined) {
      delete body.tags;
      let updations = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: body },
        { new: true }
      );
      if (updations.isPublished == true) {
        let publishDate = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          { publishedAt: Date.now() },
          { new: true }
        );
      }
      let arr = updations.tags;
      let newArr = arr.concat(tagsUpdates);
      let updation2 = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: { tags: newArr } },
        { new: true }
      );
      return res.status(200).send({ status: true, data: updation2 });
    }

    if (tagsUpdates === undefined && subCatUpdates !== undefined) {
      delete body.subcategory;
      let updations = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: body },
        { new: true }
      );
      if (updations.isPublished == true) {
        let publishDate = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          { publishedAt: Date.now() },
          { new: true }
        );
      }
      let arr = updations.subcategory;
      let newArr = arr.concat(subCatUpdates);
      let updation2 = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: { subcategory: newArr } },
        { new: true }
      );
      return res.status(200).send({ status: true, data: updation2 });
    }

    if (tagsUpdates !== undefined && subCatUpdates !== undefined) {
      delete body.tags;
      delete body.subcategory;
      let updations = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: body },
        { new: true }
      );
      if (updations.isPublished == true) {
        let publishDate = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          { publishedAt: Date.now() },
          { new: true }
        );
      }
      let arr = updations.tags;
      let arr1 = updations.subcategory;
      let newArr = arr.concat(tagsUpdates);
      let newArr1 = arr1.concat(subCatUpdates);
      let updation2 = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: { tags: newArr, subcategory: newArr1 } },
        { new: true }
      );
      return res.status(200).send({ status: true, data: updation2 });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error", error: error.message });
  }
};

const deleteBlogs = async function (req, res) {
  try {
    let id = req.params.blogsId;
    let blogs = await BlogModel.findOneAndUpdate(
      { $and: [{ _id: id }, { isDeleted: false }] },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
    if (blogs === null) {
      return res.status(404).send({ status: false, msg: "Not Found" });
    } else {
      return res.status(200).send({ status: true, msg: "Blog Deleted." });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error", error: error.message });
  }
};

const deleteCategory = async function (req, res) {
  try {
    let filter = req.query;
    if (Object.keys(filter).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid category." });
    }
    if (filter.tags == undefined && filter.subcategory == undefined) {
      let data = await BlogModel.updateMany(
        { $and: [filter, { isDeleted: false }] },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true }
      );
      if (data.length === 0) {
        return res.status(404).send({ status: false, msg: "No data found" });
      }
      return res.status(200).send({ status: true, msg: "Blogs Deleted" });
    }
    if (filter.tags != undefined && filter.subcategory == undefined) {
      let tags = filter.tags;
      delete filter.tags;
      let blogs = await BlogModel.updateMany(
        { $and: [{ tags: { $in: [tags] } }, filter] },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true }
      );
      if (blogs.length !== 0) {
        return res.status(200).send({ status: true, msg: "Blogs Deleted" });
      }
      return res.status(404).send({ status: false, msg: "No data found" });
    }
    if (filter.tags == undefined && filter.subcategory != undefined) {
      let subCat = filter.subcategory;
      delete filter.subcategory;
      let blogs = await BlogModel.updateMany(
        { $and: [{ subcategory: { $in: [subCat] } }, filter] },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true }
      );
      if (blogs.length !== 0) {
        return res.status(200).send({ status: true, msg: "Blogs deleted" });
      }
      return res.status(404).send({ status: false, msg: "No data found" });
    }
    if (filter.tags != undefined && filter.subcategory != undefined) {
      let subCat = filter.subcategory;
      let tags = filter.tags;
      delete filter.subcategory;
      delete filter.tags;
      let blogs = await BlogModel.updateMany(
        {
          $and: [
            { tags: { $in: [tags] } },
            { subcategory: { $in: [subCat] } },
            filter,
          ],
        },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true }
      );
      if (blogs.length !== 0) {
        return res.status(200).send({ status: true, msg: "deleted" });
      }
      return res.status(404).send({ status: false, msg: "No data found" });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error", error: error.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlogs = deleteBlogs;
module.exports.deleteCategory = deleteCategory;
