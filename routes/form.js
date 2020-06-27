const express = require("express");
const Users = require("../models/user");
const fs = require("fs");
const AWS = require("aws-sdk")
const isAuth = require("../middleware/is-auth");

// const sts = new AWS.STS();


const router = express.Router();

router.get("/form", isAuth, function (req, res) {
    res.render("form", {pageTitle: "Form"});
})

router.post("/form", isAuth, function (req, res) {

    // sts.assumeRole({
    //     DurationSeconds: 3600,
    //     ExternalId: '535718353127',
    //     RoleArn: "arn:aws:iam::535718353127:role/s3_fullaccess_by_ec2",
    //     RoleSessionName: 'mankibaatuserform'
    // }, (err, data) => {
    //     if (err) throw err;
    // })

    const s3 = new AWS.S3({
        accessKeyId: "AKIAIXXCKNDVTNEBFIUQ",
        secretAccessKey: "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"
    })

    answers = [req.body.q1, req.body.q2, req.body.q3, req.body.q4];

    // for (var i = 0; i < req.body.length; ++i) {
    //     answers.push(req.body[i]);
    // }

    var csv = answers.map(function (ans) {
            return JSON.stringify(Object.values(ans));
        })
        .join("\n")
        .replace(/(^\[)|(\]$)/mg, '');

    const filename = req.session.user._id + ".csv";

    fs.writeFile(filename, answers, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        }

    });

    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: "mankibaatuserdata",
            Key: "userform/"+filename,
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
                        return res.redirect("/form");
                    }
                })
            }
        });
    });
})

module.exports = router;