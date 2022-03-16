const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization")



router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.loginAuthor)

router.post("/blogs", authenticate.authenticate, blogController.createBlog)

router.get("/blogs", authenticate.authenticate, blogController.getBlogs)

router.put("/blogs/:blogsId/:authorId",authenticate.authenticate,authorize.authCheck, blogController.updateBlogs)

router.delete("/blogs/:blogsId/:authorId",authenticate.authenticate,authorize.authCheck, blogController.deleteBlogs)

router.delete("/blogs/:authorId",authenticate.authenticate,authorize.authCheck, blogController.deleteCategory)




module.exports = router;