const jwt = require("jsonwebtoken");
const { getFromRedis } = require("../utils/redis");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  if (token) {
    jwt.verify(token, "secret", async (error, user) => {
      if (error) {
        res.status(403).json("Forbidden");
      } else {
        const tokenFromRedis = await getFromRedis();

        if (token === tokenFromRedis) {
          req.user = user;
          next();
        } else {
          res.status(401).json("Unauthorized");
        }
      }
    });
  } else {
    res.status(401).json("Unauthorized");
  }
};

module.exports = { authUser };
