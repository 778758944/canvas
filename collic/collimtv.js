/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-27 09:57:46
 * @version $Id$
 */
var cvs=document.getElementById("cvs"),
    ctx=cvs.getContext("2d"),
    shape=[],
    polygonPoints = [
      [ new Point(250, 150), new Point(250, 200),
        new Point(300, 200) ],

      [ new Point(100, 100), new Point(100, 125),
        new Point(125, 125), new Point(125, 100) ],

      [ new Point(400, 100), new Point(380, 150),
        new Point(500, 150), new Point(520, 100) ],
    ],

    polygonStrokeStyles = [ 'blue', 'yellow', 'red'],
    polygonFillStyles   = [ 'rgba(255,255,0,0.7)',
                            'rgba(100,140,230,0.6)',
                            'rgba(255,255,255,0.8)' ],
    c1 = new Circle(150, 275, 20),
    c2 = new Circle(350, 350, 30),
    moveshape=undefined,
    lasttime=undefined,
    stuck=false;
    move=false;
    velocity={
    	x:350,
    	y:190
    };
    function drawShape(){
    	for(var i=0;i<shape.length;i++){
    		shape[i].fill(ctx);
    		shape[i].stroke(ctx);
    	}
    }

    function windowToCanvas(x,y){
    	var box=cvs.getBoundingClientRect();
    	return {
    		x:x-box.left,
    		y:y-box.top
    	}
    }



    for(var i=0;i<polygonPoints.length;i++){
    	var polygon=new Polygon();
    	var points=polygonPoints[i];

    	polygon.strokeStyle=polygonStrokeStyles[i];
    	polygon.fillStyle=polygonFillStyles[i];
    	points.forEach(function(point){
    		polygon.addPoint(point.x,point.y);
    	});
    	shape.push(polygon);
    }

    shape.push(c1);
    shape.push(c2);

    drawShape();


cvs.onmousedown=function(e){
	move=true;
	stuck=false;
	var loc=windowToCanvas(e.pageX,e.pageY);

	for(var i=0;i<shape.length;i++){
		// console.log(shape[i].isPointInPath(ctx,loc.x,loc.y));

		if(shape[i].isPointInPath(ctx,loc.x,loc.y)){
			moveshape=shape[i];
		}
	}
}
function stick(mtv){
	var dx,
	    dy,
	    velocityMagnitude,
	    point;

	if(mtv.axis==undefined){
		point=new Point();
		velocityMagnitude=Math.sqrt(Math.pow(velocity.x,2)+Math.pow(velocity.y,2));
		point.x=velocity.x/velocityMagnitude;
		point.y=velocity.y/velocityMagnitude;

		mtv.axis=new Vector(point.x,point.y);
	}

	dx=mtv.axis.x*mtv.overlap;
	dy=mtv.axis.y*mtv.overlap;
	if ((dx < 0 && velocity.x < 0) || (dx > 0 && velocity.x > 0))
      dx = -dx;

   if ((dy < 0 && velocity.y < 0) || (dy > 0 && velocity.y > 0))
      dy = -dy;

  setTimeout(function(){

  	moveshape.move(dx,dy);
  	// stuck=true;
  },500);
  stuck=true;
}

function collisionDetected(mtv){
	// console.log(mtv);
	return mtv.axis!== undefined||mtv.overlap!==0;
}

function detectCollisions(){
	if(moveshape){
		// console.log("huhu");
		var bound=moveshape.bound();

		if(bound.max_l>cvs.width||bound.min_l<0){
			// alert("jj");
			velocity.x=-velocity.x;
		}
		if(bound.max_t>cvs.height||bound.min_t<0){
			velocity.y=-velocity.y;
		}
		shape.forEach(function(spe){
			if(spe!=moveshape){
				var mtv=moveshape.collidesMtv(spe);
				// console.log(mtv);
			    if(collisionDetected(mtv)){
			    	console.log(mtv);
			    	console.log("kk");
			    	move=false;
			    	if(!stuck){
			    		stick(mtv);
			    	}
			    }
			}
		})
	}
}

function animation(){
	// console.log("kk");
	var now=new Date();
	if(!lasttime){
		lasttime=now;
	    requestAnimationFrame(animation);
		return;
	}
	ctx.clearRect(0,0,cvs.width,cvs.height);

	if(moveshape&&move){
		var elapsed=(now-lasttime)/1000;
		dx=velocity.x*elapsed;
		dy=velocity.y*elapsed;
		moveshape.move(dx,dy);
	}

	drawShape();
	detectCollisions();
	lasttime=now;
	requestAnimationFrame(animation);
}

animation();















































