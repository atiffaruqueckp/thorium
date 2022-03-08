const orderModel = require("../models/ordermodel")

const createOrder= async function (req, res) {
    let orderData= req.body
    let order= await orderModel.create(orderData)
    res.send({msg: order})
}

module.exports.createOrder = createOrder

