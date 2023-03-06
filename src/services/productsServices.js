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

module.exports = { addProduct };
