const db = require("../.././database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertIntoRedis } = require("../utils/redis");

const register = async (name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.Users.create({
    name,
    password: hashedPassword,
    isAdmin: false,
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

  await insertIntoRedis(token);

  return token;
};

module.exports = { register,login };
