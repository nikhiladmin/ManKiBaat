const identicon = require('identicon');
const Avatar = require('avatar-builder'); 
const fs = require('fs');

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
    // identicon.generate({ id: 'abcd', size: 150 }, (err, buffer) => {
    //     if (err) throw err;
     
    //     fs.writeFileSync(__dirname + '/identicon.png', buffer)
    // });
    const avatar = Avatar.githubBuilder(128);
    avatar.create('sanya').then(buffer => {
        fs.writeFileSync(__dirname + '/identicon.png', buffer)
    });
    res.render("user/avtar",{
        pageTitle : "Avtar",
        
    });
}