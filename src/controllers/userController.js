const { userSchema } = require("../schemas/user.schema");
const userServices = require("../services/userServices");
const register = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = await userServices.register(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(error.message);
    }

    const user = await userServices.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await userServices.getCartProducts(userId);
    res.status(200).json(products);
    // console.log("aaaa", products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const validate = async (req, res) => {
//   res.status(200).json({ message: "Validated" });
// };

module.exports = { register, login, getCartProducts };
