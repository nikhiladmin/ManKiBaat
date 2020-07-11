const io = require("../socket").getIO();
const Users = require("../Helper/UserClass");
const Message = require("../models/message")
var mongoose = require('mongoose');

module.exports = () => {
   const chat = io.of("/chat");

   const users = new Users();
  
   chat.on("connection", function(socket) {
      console.log("someone connected");

      let userid ;
      socket.on("newUser",(user)=>{
        // console.log(user);
        users.addUser(user.name,user.id);
        userid = user.id; 
        chat.emit("userList",users.getUser());
      });

      function search(nameKey, myArray){
         for (var i=0; i < myArray.length; i++) {
             if (myArray[i].user === nameKey) {
                 return myArray[i];
             }
         }
         return false;
     }
      socket.on("sendingMessage",(data)=>{
         let messageUsers  = data.senderToReciver.split("*");
         let senderUser = search(messageUsers[1],(users.getUser()));
        
         if(senderUser){
            Message.find({messageUsers : messageUsers},(err,data)=>{
               if(data){
                  Message.updateOne({id: data.id},{
                     $push: {"message": {
                        senderName : senderUser.user,
                        message : data.message
                     }} 
                  });
               }else{
                  const message = new Message({
                     messageUsers : data.senderToReciver,
                     message  : [{
                        senderName : senderUser.user,
                        message : data.message
                     }],
                  });
                  message.save(); 
               }
            })
         chat.emit(messageUsers[0],{
            sender : senderUser ,
            message : data.message 
         });
      }
      });

      socket.on("disconnect",() => {
         console.log("someone disconnect "+userid);
         if(userid){
             users.removeUser(userid);
             chat.emit("userList",users.getUser());
         }
      });
   });

   chat.emit("hi", "everyone!");

   // io.on("connection",socket=>{
   //     console.log("New User "+socket.id);

   //     socket.on("join",(room , callback)=>{
   //         socket.join(room.chat);
   //         callback();
   //     })

   //     const users = new User();

   //  socket.on("createMessage",(massage)=>{
   //      console.log(massage);

   //      io.to(massage.room).emit("newMessage",massage);
   //  })

   //  socket.on("disconnect",()=>{
   //      let user = users.RemoveUser(socket.id);
   //     console.log(user);
   //      if(user){
   //         io.to("chat").emit("userList",users.getUser());
   //      }
   //  });

   // });
};
