const express = require("express");
const { getAllProducts, createProduct } = require('../controllers/productController');

const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(createProduct);

router.route("/products/:id").put(up);

module.exports = router