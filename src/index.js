const express = require("express");
const app = express();
require("dotenv").config()

const { userRoute } = require("./routes/userRoute");
const {productsRoute} = require("./routes/productsRoute");
const port = 5000;

app.use(express.json());

console.log(process.env.JWT_SECRET);

app.use("/api", userRoute);
app.use("/api", productsRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
