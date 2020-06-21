const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    ques: {
        type: String
    }
});

module.exports = mongoose.model("Form", questionSchema);