const { createClient } = require("redis");
const insertIntoRedis = async (token) => {
  const client = createClient();

  client.on("error", function (error) {
    console.error(error);
  });

  
  await client.connect();
  await client.set("token", token);
  await client.disconnect();
};

const getFromRedis = async () => {
  const client = createClient();

  client.on("error", function (error) {
    console.error(error);
  });

  await client.connect();
  const token = await client.get("token");
  await client.disconnect();
  return token;
};

module.exports = { insertIntoRedis, getFromRedis };