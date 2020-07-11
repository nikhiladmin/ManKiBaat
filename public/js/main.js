$(document).ready(function() {
   let socket = io("/chat");
   let sender = $("#sender").val();
   let userid = $("#userId").val();
   let messageUsers ;

   // Styling ================================================================
   $("#message").animate({ scroll: $(document).height() }, "fast");
   var objDiv = document.getElementById("message");
    objDiv.scrollTop = objDiv.scrollHeight;
   $("#profile-img").click(function() {
      $("#status-options").toggleClass("active");
   });

   $(".expand-button").click(function() {
      $("#profile").toggleClass("expanded");
      $("#contacts").toggleClass("expanded");
   });

 // Styling ================================================================
   const newUser = {id : userid,name : sender}

   socket.on("connect", () => {
      // console.log("new user Connected");
   });

   socket.emit("newUser",newUser,()=>{
      console.log("New User connected " + newUser);
   })

   socket.on("userList",(userList)=>{

      let userOnline = userList.filter(user=>{
         return user.id !== userid;
      });

      console.log(userOnline);

      $("#userList").empty();
      for (let i = 0; i < userOnline.length; i++) {
         $(`<li class="userListLi active contact" id="${userOnline[i].user}">
         <div class="wrap">
            <span class="contact-status online"></span>
            <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
            <div class="meta">
            <p class="name">${userOnline[i].user}</p>
               <p class="preview">You</p>
            </div>
         </div>
      </li>`).appendTo("#userList")
   
      }  
         
   });


      
   $(document).on('click', ".userListLi", function(e) {
      let reciver= e.currentTarget.id;
      messageUsers = reciver+"*"+sender;
      console.log(messageUsers);
      $("#senderToReciver").val(messageUsers);
      $.get("/message/"+messageUsers, (data, status)=>{
         console.log(data);
       });
  });

  
  $("#message-form").on("submit", e => {
   e.preventDefault();
   let msg = $("#msg").val();

   $(`<li class="sent">
   <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
   <p>${msg}</p>
</li>`).appendTo("#chating");
$(".message-input input").val(null);
$(".contact.active .preview").html("<span>You: </span>" + msg.msg);
$("#message").animate({ scrollTop: $(document).height() }, "fast");
   if(messageUsers){
   socket.emit("sendingMessage",{
      senderToReciver : messageUsers ,
      message : msg
   },
   $("#msg").val("")
   );
   }
   
});

socket.on(sender,(message)=>{
   console.log(message)
   $(` <li class="replies">
   <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
   <p>${message.message}</p>
   </li>`).appendTo("#chating");
       $(".message-input input").val(null);
     $(".contact.active .preview").html("<span>You: </span>" + msg.msg);
     $("#message").animate({ scrollTop: $(document).height() }, "fast");
});
});


   // socket.on("userList", user => {
   //     console.log(user)
     
   //    }
   //    console.log(u)
   //    $(u).appendTo("#userList")
   // });

   // $("#message-form").on("submit", e => {
   //    e.preventDefault();
   //    let msg = $("#msg").val();
   //    console.log(msg);
   //    socket.emit(
   //       "createMessage",
   //       {
   //          msg: msg,
   //          room: "chat",
   //          from: sender
   //       },
   //       () => {}
   //    );
   //    $("#msg").val("");
   // });

   // socket.on("newMessage", msg => {

   //    $(
   //      '<li class="sent">'+ msg.from +'<p>' + msg.msg + "</p></li>"
   //   ).appendTo($(".messages ul"));
   //   $(".message-input input").val(null);
   //   $(".contact.active .preview").html("<span>You: </span>" + msg.msg);
  
   // });
// });
