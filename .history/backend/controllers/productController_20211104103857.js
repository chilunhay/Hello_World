const Product = require('../models/productModel');



// Create Product -- Admin
exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All Product
exports.getAllProducts = as(req, res) => {

    res.status(200).json({message:"Route is working fine"})
}