const express = require("express");
const bodyParser =require("body-parser");
const path = require("path");
const ejs=require("ejs");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
require('dotenv').config({ path: 'ENV_FILENAME' });

const User = require("./models/user");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//checking new branch

const app=express();
mongoose.connect("mongodb+srv://mankibaat:mankibaat@123@cluster0-vsx35.mongodb.net/MankiBaatDB>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const store = new mongodbSession({
    uri: "mongodb+srv://mankibaat:mankibaat@123@cluster0-vsx35.mongodb.net/MankiBaatDB?retryWrites=true&w=majority",
    collection: "session"
 });

app.set("view engine","ejs");

app.use(session({ secret: "My name is Nikhil", resave: false, saveUninitialized: false, store: store }));
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

app.use((req,res,next)=>{
    if(!req.session.user){
       return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        req.user=user;
        next();
    }).catch(err=> console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
 });

app.use(authRoutes);
app.use(userRoutes);


port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server started Successfully");
});