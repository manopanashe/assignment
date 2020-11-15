require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
/**
 * controllers route handlers
 */
const featuresController = require("./controllers/features");
const salesController = require("./controllers/sales");
const storeController = require("./controllers/store");
/**
 * 
 */
app.get("/prediction", featuresController.list);
app.get("/Sale", salesController.list);
app.get("/stores", storeController.list)

const { WEB_PORT, MONGODB_URI } = process.env;
app.set("views", "./public/views");
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

mongoose.connect(MONGODB_URI,{useNewUrlParser: true});
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
