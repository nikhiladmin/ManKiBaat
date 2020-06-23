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
    avatar :{
        type :String,
        },
});


module.exports = mongoose.model("Product", userSchema);