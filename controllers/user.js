

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