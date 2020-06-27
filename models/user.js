const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    avatar :{
        type :String,
        },

    password: {
        type: String,
        required: true
    },
    answers: {
        type: String
    }

});


module.exports = mongoose.model("Product", userSchema);