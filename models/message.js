const mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
   messageUsers : {
         type : String
      },
   message : [
      {
         senderName  : {type : String}, 
         message     : {type : String}
      }
   ]
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
