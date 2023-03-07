const db = require("../.././database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertIntoRedis } = require("../utils/redis");

const register = async (userDetails) => {
  // console.log(userDetails.password);
  
  if(!userDetails.password){
    throw new Error("Password is required");
  }
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  userDetails.isAdmin = userDetails.isAdmin ? true : false;

  const user = await db.Users.create({
    name:userDetails.name,
    password: hashedPassword,
    isAdmin:userDetails.isAdmin,
  });
  return user;
};

const login = async (userDetails) => {
  const user = await db.Users.findOne({
    where: {
      name:userDetails.name,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(userDetails.password, user.password);
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
