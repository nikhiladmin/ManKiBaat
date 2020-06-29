const express = require("express");
var {google} = require('googleapis');
const isAuth = require("../middleware/is-auth");

var youtube = google.youtube({
    version: 'v3',
    auth: "AIzaSyA1rMQxilFvMy4nyG5D-f2BHTAqC721v5U"
});

const router = express.Router();

router.get("/video", isAuth, function (req, res) {
    youtube.search.list({
        part: 'snippet',
        type: "channel",
        q: 'GoogleDevelopers'
    }, function (err, response) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (response) {
            console.log(response.data.items[0])
        }
    });
})

module.exports = router;