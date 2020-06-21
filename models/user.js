const mongoose = require("mongoose");
const Form = require("../models/questions");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    answers: []
});


module.exports = mongoose.model("Product", userSchema);