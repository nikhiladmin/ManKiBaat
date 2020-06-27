const io = require("../socket").getIO();


module.exports = ()=>{
 io.on("connection",socket=>{
     console.log("New User");

    socket.on("join",(roomName,joinUser)=>{
        socket.join(roomName.chat,function () {
           // console.log(socket.id + " now in rooms ", socket.rooms);
            joinUser();
        });
    })

     socket.on("createMessage",(massage)=>{
         console.log(massage);

         io.to(massage.room).emit("newMessage",massage);
     })
 })


}
