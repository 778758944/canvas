/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-26 10:14:41
 * @version $Id$
 */

var cvs=document.getElementById("cvs"),
    ctx=cvs.getContext("2d"),
    shapes=[],
    polygonPoints = [
      // The paths described by these point arrays
      // are open. They are explicitly closed by
      // Polygon.createPath() and Polygon.getAxes()

      [ new Point(250, 150), new Point(250, 250),
        new Point(350, 250) ],

      [ new Point(100, 100), new Point(100, 150),
        new Point(150, 150), new Point(150, 100) ],

      [ new Point(400, 100), new Point(380, 150),
        new Point(500, 150), new Point(520, 100) ]
    ],

    polygonStrokeStyles = [ 'blue', 'yellow', 'red'],
    polygonFillStyles   = [ 'rgba(255,255,0,0.7)',
                            'rgba(100,140,230,0.6)',
                            'rgba(255,255,255,0.8)' ],
    dragshape,
    mousedown={},
    image=new Image();
    image.src="tennis-ball.png";
function drawShape(){
	for(var i=0;i<shapes.length;i++){
		shape=shapes[i];
		shape.fill(ctx);
		shape.stroke(ctx);
	}
}

function windowToCanvas(x,y){
	var box=cvs.getBoundingClientRect();
	return {
		x:x-box.left,
		y:y-box.top
	}
}


for(var k=0;k<polygonPoints.length;k++){
	var polygon=new Polygon(),
	    point=polygonPoints[k];
	polygon.fillStyle=polygonFillStyles[k];
	polygon.strokeStyle=polygonStrokeStyles[k];

	point.forEach(function(p){
		polygon.addPoint(p.x,p.y);
	})
	shapes.push(polygon);
}
circle1=new Circle(150,75,20);
circle2=new Circle(350,25,30);
img=new ImageShape("golfball.png",100,100,100,100);
var tennis=new Sprite("tennis",{
	paint:function(sprite,ctx){
		ctx.save();
		ctx.drawImage(image,sprite.left,sprite.top);
		ctx.restore();
	}
});
var sprite=new SpriteShape(tennis,200,200);
shapes.push(circle1);
shapes.push(circle2);
// shapes=[];
shapes.push(img);
shapes.push(sprite);
image.onload=function(){
	tennis.width=image.width;
	tennis.height=image.height;
	sprite.setPolyPoints();
	drawShape();
}

function detectCollisions(){
	var textY=30;
	if(dragshape){
		for(var i=0;i<shapes.length;i++){
			if(shapes[i]!=dragshape){
				if(dragshape.collidesWith(shapes[i])){
					ctx.save();
					ctx.font="30px Arial";
					ctx.fillStyle=shapes[i].strokeStyle;
					ctx.fillText("COLLISION",20,textY);
					ctx.restore();
					textY+=40
				}
			}
		}
	}
}


cvs.onmousedown=function(e){
	var loc=windowToCanvas(e.pageX,e.pageY);
	for(var i=0;i<shapes.length;i++){
		console.log(shapes[i].isPointInPath(ctx,loc.x,loc.y));
		if(shapes[i].isPointInPath(ctx,loc.x,loc.y)){
			dragshape=shapes[i];
			mousedown.x=loc.x;
			mousedown.y=loc.y;
		}
		// console.log(dragshape);

	}
	cvs.onmousemove=function(e){
		if(dragshape){
		    var loc=windowToCanvas(e.pageX,e.pageY),
		    disX=loc.x-mousedown.x,
		    disY=loc.y-mousedown.y;
		    mousedown.x=loc.x;
		    mousedown.y=loc.y;
		    dragshape.move(disX,disY);
		    ctx.clearRect(0,0,cvs.width,cvs.height);
		    drawShape();
		    detectCollisions();
		}
	}

	cvs.onmouseup=function(e){
		dragshape=null;
		cvs.onmousemove=null;
		cvs.onmouseup=null;
	}
}






















































