$(document).ready(function () {
    let socket = io()
    let room ={
        chat : "chat"
    }
    socket.on("connect",()=>{
        console.log("new user Connected");
        socket.emit("join",room,()=>{
            console.log("User Join Chat");
        })
    })

    $("#message-form").on("submit",(e)=>{
        e.preventDefault();
        let msg = $("#msg").val();
        let sender =$("#sender").val();
        console.log(msg);
        socket.emit("createMessage",{
            msg : msg,
            room: "chat",
            from : sender
        },()=>{
            $("#msg").val("");
        });
    });

    socket.on("newMessage",(msg)=>{
        console.log(msg)
        let template = $("#message-template").html();
        var rendered = Mustache.render(template, { 
            user : msg.from,
            message : msg.msg
         });
         $("#messages").append(rendered);
      
    });
});








  
  