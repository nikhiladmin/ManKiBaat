const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   email :{
       type :String,
       required :true
   },
   password :{
    type :String,
    required :true
    },
    answers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"answers"
        }
    ]
});

module.exports = mongoose.model("user", userSchema);