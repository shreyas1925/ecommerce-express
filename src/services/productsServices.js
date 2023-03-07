const db = require("../.././database/models");
const addProduct = async (name, price, description, userId) => {
  const product = await db.Products.create({
    name,
    price,
    description,
    userId,
  });
  return product;
};

const getProducts = async () => {
  const products = await db.Products.findAll();
  return products;
};

module.exports = { addProduct, getProducts };
