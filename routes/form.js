const express = require("express");
const User = require("../models/user");
const answers = require("../models/answers");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/questions", function (req, res) {
    res.render("form");
})
//isAuth
router.post("/questions", function (req, res) 
{
    var newanswers=
    {
        'q1':req.body.q1,
        'q2':req.body.q2,
        'q3':req.body.q3,
        'q4':req.body.q4
    }

    answers.create(newanswers,function(err,newanswers)
    {
        if(err)
         console.log(err);
        else 
        {
            User.findById(req.session.user._id,function (err,user)
            {
                if (err)
                    next(err)
                else 
                {
                    user.answers.push(newanswers);
                    res.send("You will get your response in sometime");
                }
            })
        }
    })
})

module.exports = router;