const Message = require("../models/message");


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

exports.getChat =(req,res,next)=>{
    res.render("user/chat",{
        pageTitle : "Chat",
        userName : req.user.email,
        userid : req.user.id
    });
}

exports.getMessage=(req,res,next)=>{
    const messageUsers = (req.params.messageUsers).split("*")[0];
    Message.findOne({messageUsers : messageUsers}).then((data)=>{
        // console.log(data)
        if(!data){
            res.status(201).json(data);
        }
    });
}