const productModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let productData = req.body
    let product = await productModel.create(productData)
    
    res.send({msg: product})
}


module.exports.createProduct = createProduct
