const express = require('express');
const router = express.Router();

const CollegeController = require("../Controllers/CollegeController")
const InternController = require("../Controllers/InternController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/colleges", CollegeController.CreateCollege);

router.post("/functionup/interns", InternController.CreateIntern);

router.get("/functionup/collegeDetails",CollegeController.CollegeDetails);

module.exports = router;