const express = require('express');
const router = express.Router();

const {addProduct,getProducts} = require("../controllers/productsController");
const { authAdmin, authUser } = require('../middlewares/authMiddleware');

router.post("/products",authUser,authAdmin,addProduct);
router.get("/products",authUser,getProducts)

module.exports = {productsRoute: router}