const db = require("../.././database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertIntoRedis } = require("../utils/redis");

const register = async (name, password,isAdmin) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  isAdmin = isAdmin ? true : false;

  const user = await db.Users.create({
    name,
    password: hashedPassword,
    isAdmin
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
  const token = jwt.sign(name, 'secret');

  console.log(user)
  await insertIntoRedis(token, user.dataValues.id);

  return token;
};

module.exports = { register,login };
