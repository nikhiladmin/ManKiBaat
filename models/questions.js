const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    ques: {
        type: String
    }
});

questionModel = mongoose.model("Form", questionSchema);
module.exports = {
    questionModel,
    questionSchema
}