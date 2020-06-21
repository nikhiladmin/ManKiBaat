const express = require("express");
const Form = require("../models/questions");
const isAuth = require("../middleware/is-auth");

const router = express.Router();


router.post("/", function(req, res){
    const question = new Form.questionModel({
        ques: req.body.question
    });
    Form.questionModel.save(question, function(err, question){
        if(!err)
        {
            console.log("Saved Successfully");
        }
        else
        {
            console.log(err);
        }
    })
})

module.exports = router;


