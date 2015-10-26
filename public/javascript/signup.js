$(document).ready(function(){
  $('input[type="submit"]').click(function(e){                            
    console.log(e);
    e.preventDefault();  
    var user = {
      username: $("#username").val(),
      email: $("#email").val()  
    };
    console.log(user);
    $.ajax({
      type: "POST",
      url: "/Signup",
      data: user
    }).done(function(data){
      console.log(data);
    });

    //  var greet = function(msg){  
      //  $('#signup').html("");  
      //  var greeting = $('<h2>Hi,'+msg.username+',your id is :'+ msg.id +' we will send email to you '+msg.email+'</h2>');  
      //  $('#signup').append(greeting);  
      //  };         
  });        
});
