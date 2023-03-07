const db = require("../.././database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertIntoRedis } = require("../utils/redis");

const register = async (name, password, isAdmin) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  isAdmin = isAdmin ? true : false;

  const user = await db.Users.create({
    name,
    password: hashedPassword,
    isAdmin,
  });
  return user;
};

const login = async (name, password) => {
  const user = await db.Users.findOne({
    where: {
      name,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Password is not valid");
  }
  const token = jwt.sign(name, "secret");

  console.log(user);
  await insertIntoRedis(token, user.dataValues.id);

  return token;
};

const getCartProducts = async (userId) => {
  const user = await db.Users.findOne({
    where: {
      id: userId,
    },
  });

  console.log("user1",user.dataValues.cart)

  const cartProducts = user.dataValues.cart;

  const productDetails = new Array();

 await Promise.all(cartProducts.map(async (productId) => {
    const cartProduct = await db.Products.findOne({
      where: {
        id: productId,
      },
    });
    console.log("cartproduct",cartProduct.dataValues)
    productDetails.push(cartProduct.dataValues.name);
  }));
  return productDetails;
};

module.exports = { register, login, getCartProducts };
