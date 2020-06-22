const express = require("express");
const Users = require("../models/user");
const fs = require("fs");
const AWS = require("aws-sdk")
const isAuth = require("../middleware/is-auth");

const s3 = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: ""
})

const router = express.Router();

router.get("/", isAuth, function (req, res) {
    res.render("form");
})

router.post("/", isAuth, function (req, res) {

    answers = [];

    for (var i = 0; i < req.body.length; ++i) {
        answers.push(req.body[i]);
    }

    var csv = answers.map(function (ans) {
            return JSON.stringify(Object.values(ans));
        })
        .join("\n")
        .replace(/(^\[)|(\]$)/mg, '');

    const filename = req.session.user._id + ".csv";

    fs.writeFile(filename, dataToWrite, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        }

    });

    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: "",
            Key: filename,
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, (Err, data) => {
            if (Err) throw Err
            else {
                Users.findOneAndUpdate({
                    "_id": req.session.user._id
                }, {
                    "answers": data.Location
                }, function (err, tasks) {
                    if (err)
                        next(err)
                    else {
                        fs.unlinkSync(filename);
                        return res.redirect("/");
                    }
                })
            }
        });
    });
})

module.exports = router;