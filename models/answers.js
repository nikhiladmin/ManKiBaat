var mongoose=require("mongoose");

var answersschema=new mongoose.Schema({
    q1:String,
    q2:String,
    q3:Number,
    q4:Number
})

module.exports=mongoose.model("answers",answersschema);