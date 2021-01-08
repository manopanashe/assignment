require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");

/**
 * controllers route handlers
 */
const featureController = require("./controllers/feature");
const salesController = require("./controllers/sale");
const storeController = require("./controllers/store");
const userController = require("./controllers/user");
app.set("view engine", "ejs");
/**
 * 
 */
const { PORT, MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI,{useNewUrlParser: true});
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }));
app.get("/", (req, res) => {
  res.render("index");
});

global.user = false;
app.use('*',async(req,res,next)=>{
  console.log('running');
  console.log('this is our user');
  console.log(req.session);
  if(req.session.userID){
    const userL = await User.findById(req.session.userID);
    global.user = userL;
  }
  next();
});

const authMiddleware = async(req,res,next) =>{
const user = await User.findById(req.session.userID);
  if(!user){
    return res.redirect('/');
  }
  next();
}

app.get("/JCfeatures", featureController.list);
app.get("/JCfeatures/update/:id", featureController.edit);
app.get("/JCfeatures/update/:id", featureController.update);
app.get("JCfeatures/delete/:id", featureController.delete);
app.get("/create-feature", authMiddleware,(req,res) =>{
  res.render("create-feature",{errors:{}})
});
app.post("/create-feature", featureController.create);

app.get("/JCsales", salesController.list);
app.get("/JCsales/update/:id", salesController.edit);
app.post("/JCsales/update/:id", storeController.update);
app.get("/JCsales/delete/:id", storeController.delete);
app.get("/create-sale",(req,res) =>{
  res.render("create-sale",{errors:{}})
});
app.post("/create-sale", salesController.create);

app.get("/JCstores", storeController.list)
app.get("/JCstores/update/:id",storeController.edit);
app.post("/Jcstores/update/:id",storeController.update);
app.get("/JCstores/delete/:id",storeController.delete);
app.get("/create-store", (req,res)=>{
  res.render("create-store", {errors:{}})
})
app.post("/create-store", storeController.create);


app.set("views", "./public/views");


/**
 * notice above we are using dotenv. We can now pull the values from our envATironment
 */



app.get('/join',(req,res) =>{
  res.render('create-user', {errors:{} });
});
app.post('/join',userController.create)

app.get('/login',(req,res) =>{
  res.render('login-user', {errors:{} });
});
app.post('/login',userController.login)
app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
