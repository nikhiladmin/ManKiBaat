const User = require("../models/user");

exports.home =(req,res,next)=>{
    res.render("home",{
        pageTitle : "Home Page"
    });
}

exports.User =(req,res,next)=>{
    res.render("user/user",{
        pageTitle : "User",
        avatar : req.user.avatar
    });
}


exports.chat =(req,res,next)=>{
    res.render("user/chat",{
        pageTitle : "Chat"
    });
}

