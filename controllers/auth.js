
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const socket = require("../socket");



exports.getLogin = (req, res, next) => {
   res.render("auth/login", {
      pageTitle: "Login",
      oldInput: { email: "", password: "" },
      errorMessage :null
   });
};

exports.postLogin = (req, res, next) => {
   const email =req.body.email;
   const password=req.body.password;
   const errors = validationResult(req);
   if(!errors.isEmpty()){
return res.status(422).render("auth/login",{
        pageTitle : "login",
        errorMessage : errors.array()[0].msg,
        oldInput : {email :email,password :password },
    });
  }

  User.findOne({email :email}).then(user=>{
    if(!user){
       
    return res.status(422).render("auth/login",{
            pageTitle : "login",
            errorMessage : "Account not exist!",
            oldInput : {email :email,password :password },
        });
        }
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(isMatch){

            //Active User
            console.log(user);
            socket.getIO() .of('/chat').emit("activeUser",{
                name : user.email
            });

            req.session.isLoggedIn = true;  
            req.session.user=user;
            return req.session.save(()=>{
            res.redirect("/user");
            });
            }else{
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                    res.status(422).render("auth/login",{
                    pageTitle : "login",
                    errorMessage : "Password not correct !",
                    oldInput : {email :email,password :password },
                });
                
            }
        })
        .catch(err=> console.log(err));
    })
.catch(err=> console.log(err));
};

exports.getSignup = (req, res, next) => {
   res.render("auth/signup", {
      pageTitle: "Signup",
      errorMessage : null,
      oldInput: { email: "", password: "", confirmPassword: "" },
   });
};

exports.postSignup = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   const confirmPassword = req.body.confirmPassword;
 const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render("auth/signup", {
         path: "/signup",
         pageTitle: "Signup",
         errorMessage: errors.array()[0].msg,
         oldInput: { email: email, password: password, confirmPassword: confirmPassword },
         validationErrors: errors.array()
      });
   }
   bcrypt
   .hash(password, 12)
   .then(hashedPassword => {
     const user = new User({
       email: email,
       password: hashedPassword,
     });
     return user.save();
   }).then(result=>{
       req.flash('email', email)
       res.redirect("/avatar");
   })
.catch(err => {
 console.log(err);
});
};

exports.postLogout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    });
}

exports.getAvatar = (req,res,next)=>{
    res.render("user/avatar",{
        pageTitle : "Choose Avatar"
    });
}

exports.postAvatar = (req,res,next)=>{
    let email = req.flash('email')
    avatarLink = req.body.avatarLink;
    User.findOneAndUpdate({email : email}, { $set: { avatar: avatarLink }}, { new: true }, function (err, user) {
        if (!err) {
            User.findOne({email:email}).then(user=>{
                req.session.isLoggedIn = true;  
                req.session.user=user;
                return req.session.save(()=>{
                res.redirect("/user");
                });
            }); 
        }
      });
}

