const express = require('express');
const router = express.Router();

const {addProduct,getProducts,addProductToCart} = require("../controllers/productsController");
const { authAdmin, authUser } = require('../middlewares/authMiddleware');

router.post("/products",authUser,authAdmin,addProduct);
router.get("/products",authUser,getProducts)

router.post("/cart/:productId",authUser,addProductToCart);

module.exports = {productsRoute: router}