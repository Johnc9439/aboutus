     var rabbit = document.getElementById("rabbit");
     document.addEventListener("mousemove", getMouse);

     rabbit.style.position = "absolute"; //css		
     var rabbitpos = {
       x: 0,
       y: 0
     };

     setInterval(followMouse,20);

     var mouse = {
       x: 0,
       y: 0
     }; //mouse.x, mouse.y

     var dir = "right";

     function getMouse(e) {
       mouse.x = e.pageX;
       mouse.y = e.pageY;
       //Checking directional change
       if (mouse.x > rabbitpos.x) {
         dir = "right";
       } else {
         dir = "left";
       }
     }

     function followMouse() {
       //1. find distance X , distance Y
       var distX = mouse.x - rabbitpos.x;
       var distY = mouse.y - rabbitpos.y;
       //Easing motion
       //Progressive reduction of distance 
       rabbitpos.x += distX / 5;
       rabbitpos.y += distY / 2;
       
	   if (mouse.x > rabbitpos.x){
          rabbit.style.left = rabbitpos.x -200+ "px";
          rabbit.style.top = rabbitpos.y + "px";
       }else{
		  rabbit.style.left = rabbitpos.x +50+ "px";
          rabbit.style.top = rabbitpos.y + "px"; 
	   }
	   
       //Apply css class 
       if (dir == "right") {
         rabbit.setAttribute("class", "right");
       } else {
         rabbit.setAttribute("class", "left");
       }

     }