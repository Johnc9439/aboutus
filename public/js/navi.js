/* navigation */
$(".nav-btn").click(function(){
      $("#menu").fadeToggle("active");
      $("#content").toggleClass("active"); 
      $(".nav-btn").toggleClass("active");
});


