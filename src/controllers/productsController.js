const productServices = require('../services/productsServices')
const addProduct = async(req, res) => {
    try{
        const {name, price, description,userId} = req.body;
        const product = await productServices.addProduct(name, price, description,userId)
        res.status(200).json(product)   
    }
    catch(error)
    {
        res.status(400).json({message : error.message})
    }
}

const getProducts = async(req, res) => {
    try{
        const products = await productServices.getProducts()
        res.status(200).json(products)
    }
    catch(error)
    {
        res.status(400).json({message : error.message})
    }
}

module.exports = {addProduct,getProducts}