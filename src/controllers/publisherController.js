const PublisherModel= require("../models/newPublisherModels")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await PublisherModel.create(publisher)
    res.send({data: publisherCreated})
}

const getPublishersData= async function (req, res) {
    let publishers = await PublisherModel.find()
    res.send({data: publishers})
}

module.exports.createPublisher= createPublisher
module.exports.getPublisherData= getPublishersData