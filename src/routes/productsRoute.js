const express = require('express');
const router = express.Router();

const {addProduct} = require("../controllers/productsController");

router.post("/products",addProduct);

module.exports = {productsRoute: router}