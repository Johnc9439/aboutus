$(document).ready(function(){
  $('input[type="submit"]').click(function(e){                            
    console.log(e);
    e.preventDefault();  
    var user = {
      username: $("#username").val(),
      passw: $("#password").val()  
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




$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
