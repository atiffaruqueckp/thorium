const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization")


router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/getAuthorsData", authorController.getAuthorsData)

router.get("/getblogs", authenticate.authenticate, blogController.getBlogs)

//router.put("/blogs/:blogsId", blogController.updateBlogs)

router.put("/blogs/:blogsId/:authorId",authenticate.authenticate,authorize.authCheck, blogController.updateBlogs)

//router.delete("/blogs/:blogsId", blogController.deleteBlogs)

router.delete("/blogs/:blogsId/:authorId",authenticate.authenticate,authorize.authCheck, blogController.deleteBlogs)

//router.delete("/blogs", blogController.deleteCategory)

router.delete("/blogs",authenticate.authenticate, blogController.deleteCategory)

router.post("/login", blogController.loginAuthor)


module.exports = router;