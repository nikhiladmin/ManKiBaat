const UserExist =(req,res,next)=>{
    if(req.user){
        return res.redirect("/user");
    }
    next();
}
module.exports =UserExist;