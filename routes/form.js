const express = require("express");
const User = require("../models/user");
const Form = require("../models/questions");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, function (req, res) {
    res.render("form", {
        Form: Form
    });
})

router.post("/", isAuth, function (req, res) {
    answers = [];

    for (var i = 0; i < req.body.num; ++i) {
        ans = {
            ques_ID: req.body.sol[i].ques_ID,
            ques_ans: req.body.sol[i].ques_ans
        };
        answers.push(ans);
    }
    Users.findOneAndUpdate({
        "_id": req.session.user._id
    }, {
        "answers": answers
    }, function (err, tasks) {
        if (err)
            next(err)
        else {
            return res.redirect("/");
        }
    })
})