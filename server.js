const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

mongoose
  .connect(process.env.MongoUrl)
  .then((data) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log("connected", process.env.PORT);
});
