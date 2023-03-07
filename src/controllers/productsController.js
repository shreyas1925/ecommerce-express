const productServices = require('../services/productsServices')
const {productSchema} = require('../schemas/products.schema');

const addProduct = async(req, res) => {
    try{
        const {error,value} = productSchema.validate(req.body,{abortEarly : false})
        if(error)
        {
            throw new Error(error.message)
        }
        const {name, price, description} = req.body;
        const product = await productServices.addProduct(name, price, description)
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

const addProductToCart = async(req, res) => {
    try{
        const {productId} = req.params;
        const userId = req.userId;
        // console.log("uuuu",userId)
        const product = await productServices.addProductToCart(productId,userId)
        res.status(200).json(product)
    }
    catch(error)
    {
        res.status(400).json({message : error.message})
    }
}


module.exports = {addProduct,getProducts,addProductToCart}