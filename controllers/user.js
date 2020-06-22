// const Avatar = require('avatar-builder'); 
// const fs = require('fs');

exports.home =(req,res,next)=>{
    res.render("home",{
        pageTitle : "Home Page"
    });
}

exports.User =(req,res,next)=>{
    res.render("user/user",{
        pageTitle : "User"
    });
}

exports.avtar =(req,res,next)=>{
    //const uid = req.user.email;
    res.render("user/avtar",{
        pageTitle : "Avtar",
        
    });
}