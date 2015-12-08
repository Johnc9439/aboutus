//画布
var canvas ;
var context ;
//蒙版
var canvas_bak;
var context_bak;

var canvasWidth = 500;
var canvasHeight = 400;

var canvasTop;
var canvasLeft;

//画笔大小
var size = 1;
var color  = '#000000';

var drawingAreaX = 111;
         var drawingAreaY = 11;
         var drawingAreaWidth = 267;
         var drawingAreaHeight = 200;
	
	     var outlineImage = new Image();
		 
		 
	       outlineImage.src = "hello_files/img/duck.png";



//画图形
var draw_graph = function(graphType,obj){	
context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);

	//把蒙版放于画板上面
	$("#canvas_bak").css("z-index",1);
	
	//先画在蒙版上 再复制到画布上
		
	chooseImg(obj);			
	var canDraw = false;	
	
	var startX;
	var startY;
	

	//鼠标按下获取 开始xy开始画图
	var mousedown = function(e){
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		context.strokeStyle= color;
		context_bak.strokeStyle= color;
		context_bak.lineWidth = size;
		e=e||window.event;
		startX = e.clientX - canvasLeft;
		startY = e.clientY - canvasTop;
		context_bak.moveTo(startX ,startY );
		lastPoint = { x: e.clientX, y: e.clientY };
		canDraw = true;			
		
		if(graphType == 'pencil'){
			context_bak.beginPath();
		}else if(graphType == 'circle'){
			context.beginPath();
			context.moveTo(startX ,startY );
			context.lineTo(startX +2 ,startY+2);
			context.stroke();	
			
		}else if(graphType == 'rubber'){							
			context.clearRect(startX - size * 10 ,  startY - size * 10 , size * 20 , size * 20);				
		}	
	};	

	//鼠标离开 把蒙版canvas的图片生成到canvas中
	var mouseup = function(e){
		e=e||window.event;
		canDraw = false;
		var image = new Image();
		if(graphType!='rubber'){	
			
			image.src = canvas_bak.toDataURL();
			image.onload = function(){
				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
				clearContext();
				saveImageToAry();
			}
			var x = e.clientX   - canvasLeft;
			var y = e.clientY  - canvasTop;	
			context.beginPath();
			context.moveTo(x ,y );
			context.lineTo(x +2 ,y+2);
			context.stroke();	
			
		}
		
		
		
		
		
	};

	//选择功能按钮 修改样式
	function chooseImg(obj){
		var imgAry  = $("#drawController img");
		for(var i=0;i<imgAry.length;i++){
			$(imgAry[i]).removeClass('border_choose');
			$(imgAry[i]).addClass('border_nochoose');				
		}
		$(obj).removeClass("border_nochoose");
		$(obj).addClass("border_choose");
	}

	function chooseImg(obj){
		var imgAry  = $("#drawController img");
		for(var i=0;i<imgAry.length;i++){
			$(imgAry[i]).removeClass('border_choose');
			$(imgAry[i]).addClass('border_nochoose');				
		}
		$(obj).removeClass("border_nochoose");
		$(obj).addClass("border_choose");
	}
	
	// 鼠标移动
	var  mousemove = function(e){
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		e=e||window.event;
		var x = e.clientX   - canvasLeft;
		var y = e.clientY  - canvasTop;	
		//方块  4条直线搞定
		if(graphType == 'square'){
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);						
				context_bak.lineTo(x  ,startY );
				context_bak.lineTo(x  ,y );
				context_bak.lineTo(startX  ,y );
				context_bak.lineTo(startX  ,startY );
				context_bak.stroke();
				
			}
		//直线
		}else if(graphType =='line'){						
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);
				context_bak.lineTo(x  ,y );
				context_bak.stroke();
			}
		//画笔
		}else if(graphType == 'pencil'){
			if(canDraw){
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
				context_bak.lineTo(e.clientX   - canvasLeft ,e.clientY  - canvasTop);
				context_bak.stroke();
              
				
				
			}
			
		//圆 未画得时候 出现一个小圆
		}else if(graphType == 'test'){
			if(canDraw){
			     context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
                context_bak.lineWidth = 3;
			    context_bak.lineJoin = context_bak.lineCap = 'round';
				 
                 
                 
				context_bak.beginPath();
				context_bak.globalAlpha = 1;
				context_bak.moveTo(lastPoint.x- canvasLeft, lastPoint.y- canvasTop);
				context_bak.lineTo(e.clientX- canvasLeft, e.clientY- canvasTop);
				context_bak.stroke();
				 				 								
                 context_bak.moveTo(lastPoint.x- canvasLeft - 4, lastPoint.y - 4- canvasTop);
                 context_bak.lineTo(e.clientX - canvasLeft- 4, e.clientY - 4- canvasTop);
                 context_bak.stroke();
  
                 context_bak.moveTo(lastPoint.x- canvasLeft - 2, lastPoint.y - 2- canvasTop);
                 context_bak.lineTo(e.clientX- canvasLeft - 2, e.clientY - 2- canvasTop);
                 context_bak.stroke();
  
                 context_bak.moveTo(lastPoint.x- canvasLeft + 2, lastPoint.y + 2- canvasTop);
                 context_bak.lineTo(e.clientX- canvasLeft + 2, e.clientY + 2- canvasTop);
                 context_bak.stroke();
  
                 context_bak.moveTo(lastPoint.x- canvasLeft + 4, lastPoint.y + 4- canvasTop);
                 context_bak.lineTo(e.clientX- canvasLeft + 4, e.clientY + 4- canvasTop);
                 context_bak.stroke();   
				 
				 lastPoint = {x: e.clientX, y: e.clientY }; 
				 
			}
		//圆 未画得时候 出现一个小圆
		}else if(graphType == 'circle'){						
			clearContext();
			if(canDraw){
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
				context_bak.beginPath();			
				var radii = Math.sqrt((startX - x) *  (startX - x)  + (startY - y) * (startY - y));
				context_bak.arc(startX,startY,radii,0,Math.PI * 2,false);									
				context_bak.stroke();
			}else{	
				context_bak.beginPath();					
				context_bak.arc(x,y,20,0,Math.PI * 2,false);
				context_bak.stroke();
			}
		//涂鸦 未画得时候 出现一个小圆
		}else if(graphType == 'handwriting'){											
			if(canDraw){
			
				context_bak.beginPath();	
				context_bak.strokeStyle = color;
				context_bak.fillStyle  = color;
				context_bak.arc(x,y,size*10,0,Math.PI * 2,false);		
				context_bak.fill();
				context_bak.stroke();
				context_bak.restore();
			}else{	
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
				clearContext();
				context_bak.beginPath();					
				context_bak.fillStyle  = color;
				//context_bak.arc(x,y,size*10,0,Math.PI * 2,false);
				context_bak.fill();
				context_bak.stroke();
			}
		//橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
		}else if(graphType == 'rubber'){	
		    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			context_bak.lineWidth = 1;
			clearContext();
			context_bak.beginPath();			
			context_bak.strokeStyle =  '#000000';						
			context_bak.moveTo(x - size * 10 ,  y - size * 10 );						
			context_bak.lineTo(x + size * 10  , y - size * 10 );
			context_bak.lineTo(x + size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y - size * 10 );	
			context_bak.stroke();		
			if(canDraw){							
				context.clearRect(x - size * 10 ,  y - size * 10 , size * 20 , size * 20);
										
			}			
		}
	};


	//鼠标离开区域以外 除了涂鸦 都清空
	var mouseout = function(){
		if(graphType != 'handwriting'){
			clearContext();
		}
	}

	$(canvas_bak).unbind();
	$(canvas_bak).bind('mousedown',mousedown);
	$(canvas_bak).bind('mousemove',mousemove);
	$(canvas_bak).bind('mouseup',mouseup);
	$(canvas_bak).bind('mouseout',mouseout);
	
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	 
	
}






//清空层
var clearContext = function(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
		context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
		context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		
	}
}

