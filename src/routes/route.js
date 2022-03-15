const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")



router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/getAuthorsData", authorController.getAuthorsData)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogsId", blogController.updateBlogs)

router.delete("/blogs/:blogsId", blogController.deleteBlogs)

router.delete("/blogs", blogController.deleteCategory)


module.exports = router;