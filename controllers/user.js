

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
        room : req.params.chatName,
        userName : req.user.email
    });

}