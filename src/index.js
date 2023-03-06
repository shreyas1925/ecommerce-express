const express = require("express");
const app = express();
require("dotenv").config()

const { userRoute } = require("./routes/userRoute");
const port = 5000;

app.use(express.json());

console.log(process.env.JWT_SECRET);

app.use("/api", userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
