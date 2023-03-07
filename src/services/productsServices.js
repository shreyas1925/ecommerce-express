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

const addProductToCart = async (productId, userId) => {
  const product = await db.Products.findOne({
    where: {
      id: productId,
    },
  });

  const user = await db.Users.findOne({
    where: {
      id: userId,
    },
  });

 await db.Users.update(
    {
      cart: [...user.cart, product.id],
    },
    {
      where: {
        id: userId,
      },
    }
  );

  await user.save();

  return user;
};

module.exports = { addProduct, getProducts, addProductToCart };
