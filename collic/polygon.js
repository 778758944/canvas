/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-26 10:47:36
 * @version $Id$
 */

//Polygons
var Point=function(x,y){
	this.x=x;
	this.y=y;
}

var Polygon=function(){
	this.points=[];
	this.strokeStyle="blue";
	this.fillStyle="white";
}

Polygon.prototype=new Shape();//多边形的原型是Shape的一个实例反应到实际中就是多变形也是Shape


//返回到投影对象
Polygon.prototype.collidesWith=function(anotherShape){
	var axes=anotherShape.getAxes();
	if(axes==undefined){
		return polygonCollidesWithCircle(this,anotherShape);
	}
	else{
		var axes=this.getAxes().concat(anotherShape.getAxes());
		return !this.separationOnAxes(axes,anotherShape);	
	}
}

Polygon.prototype.project=function(axis){
	var scalars=[],
	    v=new Vector();
	this.points.forEach(function(point){
		v.x=point.x;
		v.y=point.y;
		scalars.push(v.dotProduct(axis));//求的点积
	});
	return new Projection(Math.min.apply(Math,scalars),Math.max.apply(Math,scalars));
}


Polygon.prototype.getAxes=function(){
	var v1=new Vector(),
	    v2=new Vector(),
	    axes=[];
	for(var i=0;i<this.points.length-1;i++){

		v1.x=this.points[i].x;
		v1.y=this.points[i].y;

		v2.x=this.points[i+1].x;
		v2.y=this.points[i+1].y;

		axes.push(v1.edge(v2).normal());
	}
	v1.x=this.points[this.points.length-1].x;
	v1.y=this.points[this.points.length-1].y;

	v2.x=this.points[0].x;
	v2.y=this.points[0].y;
	axes.push(v1.edge(v2).normal());
	return axes;
}

Polygon.prototype.addPoint=function(x,y){
	var point=new Point(x,y);
	this.points.push(point);
}

Polygon.prototype.createPath=function(ctx){
	if(this.points.length==0){
		return;
	}
	ctx.beginPath();
	ctx.moveTo(this.points[0].x,this.points[0].y);
	for(var i=1;i<this.points.length;i++){
		ctx.lineTo(this.points[i].x,this.points[i].y);
	}
	ctx.closePath();
}

Polygon.prototype.move=function(dx,dy){
	for(var i=0;i<this.points.length;i++){
		point=this.points[i];
		point.x+=dx;
		point.y+=dy;
	}
}
Polygon.prototype.collidesMtv=function(shape){
	if(!shape.radius){
		return polygonCollidesWithPolygon(this,shape);
	}
	else{
		return polygonCollidesWithCircle(this,shape);
	}
}

Polygon.prototype.bound=function(){
	var x=[],
	    y=[];
	for(var i=0;i<this.points.length;i++){
		var point=this.points[i];
		x.push(point.x);
		y.push(point.y);
	}
	return {
		max_l:Math.max.apply(Math,x),
		max_t:Math.max.apply(Math,y),
		min_l:Math.min.apply(Math,x),
		min_t:Math.min.apply(Math,y)
	}
}
Polygon.prototype.centroid=function(){
	var pointSum=new Point(0,0);
	var num=this.points.length;
	for(var i=0;i<num;i++){
		var point=this.points[i];
		pointSum.x+=point.x;
		pointSum.y+=point.y;
	}
	return new Point(pointSum.x/num,pointSum.y/num);
}

var Circle=function (x,y,radius){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.strokeStyle="rgba(255,253,208,0.9)";
	this.fillStyle="rgba(147,197,114,0.8)";
}

Circle.prototype=new Shape();

Circle.prototype.collidesWith=function(shape){
	var point,
	    length,
	    min=10000,
	    v1,
	    v2,
	    edge,
	    perpendicular,
	    normal,
	    axes=shape.getAxes(),
	    distance;

	if(axes==undefined){
		distance=Math.sqrt(Math.pow((this.x-shape.x),2)+Math.pow((this.y-shape.y),2));
		return distance<Math.abs(this.radius+shape.radius);
		//true为碰撞
	}
	else{
		return polygonCollidesWithCircle(shape,this);
	}
}

Circle.prototype.getAxes=function(){
	return undefined;
}

Circle.prototype.project=function(axis){
	var scalars=[],
	    point=new Point(this.x,this.y),
	    dotProduct=new Vector(this.x,this.y).dotProduct(axis);
	scalars.push(dotProduct);
	scalars.push(dotProduct+this.radius);
	scalars.push(dotProduct-this.radius);

	return new Projection(Math.min.apply(Math,scalars),Math.max.apply(Math,scalars));
}

Circle.prototype.move=function(dx,dy){
	this.x+=dx;
	this.y+=dy;
}

Circle.prototype.createPath=function(ctx){
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.radius,Math.PI*2,false);
}
Circle.prototype.collidesMtv=function(shape){
	if(shape.radius){
		return circleCollidesWithCircle(this,shape);
	}
	else{
		return polygonCollidesWithCircle(shape,this);
	}

}
Circle.prototype.bound=function(){
	var radius=this.radius;
	return {
		max_l:radius+this.x,
		max_t:radius+this.y,
		min_l:this.x-radius,
		min_t:this.y-radius
	}
}
Circle.prototype.centroid=function(){
	return new Point(this.x,this.y);
}
function getPolygonClosestToCircle(polygon,circle){
	var min=10000,
	    length,
	    testPoint,
	    closePoint;
	for(var i=0;i<polygon.points.length;i++){
		testPoint=polygon.points[i];
		length=Math.sqrt(Math.pow((circle.x-testPoint.x),2)+Math.pow((circle.y-testPoint.y),2));
		if(length<min){
			min=length;
			closePoint=testPoint;
		}
	}
	return closePoint;
}

function polygonCollidesWithCircle(polygon,circle){
	var min=10000,
	    v1,
	    v2,
	    edge,
	    perpendicular,
	    normal,
	    axes=polygon.getAxes(),
	    closePoint=getPolygonClosestToCircle(polygon,circle);

	    v1=new Vector(circle.x,circle.y);
	    v2=new Vector(closePoint.x,closePoint.y);

	    axes.push(v1.subtract(v2).normalize());

	    return !polygon.separationOnAxes(axes,circle);
}


var ImageShape=function(img,x,y,w,h){
	var serf=this;

	this.image=new Image();
	this.imageLoaded=false;
	this.points=[new Point(x,y)];
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;

	this.image.src=img;
}

ImageShape.prototype=new Polygon();

Image.prototype.fill=function(ctx){

}

ImageShape.prototype.setPolyPoints=function(){
	this.points.push(new Point(this.x+this.w,this.y));
	this.points.push(new Point(this.x+this.w,this.y+this.h));
	this.points.push(new Point(this.x,this.y+this.h));
}

ImageShape.prototype.drawImage=function(ctx){
	ctx.drawImage(this.image,this.points[0].x,this.points[0].y,this.w,this.h);
}

ImageShape.prototype.stroke=function(ctx){
	var serf=this;
	if(this.imageLoaded){
		ctx.drawImage(this.image,this.points[0].x,this.points[0].y,this.w,this.h);
	}
	else{
		serf.image.addEventListener("load",function(){
			serf.drawImage(ctx,this.points[0].x,this.points[0].y,this.w,this.h);
			serf.imageLoaded=true;
			serf.setPolyPoints();
		}.bind(this),false);
	}

}


var SpriteShape=function(sprite,x,y){
	this.sprite=sprite;
	this.x=x;
	this.y=y;
	sprite.left=x;
	sprite.top=y;
	this.setPolyPoints();
}

SpriteShape.prototype=new Polygon();

SpriteShape.prototype.move=function(dx,dy){
	var point,x;
	for(var i=0;i<this.points.length;i++){
		point=this.points[i];
		point.x+=dx;
		point.y+=dy;
	}
	this.sprite.left=this.points[0].x;
	this.sprite.top=this.points[0].y;
}

SpriteShape.prototype.fill=function(){}

SpriteShape.prototype.setPolyPoints=function(){
	console.log(this.sprite.width);
	console.log(this.sprite.height);
	// this.points=[];
	this.points.push(new Point(this.x,this.y));
	this.points.push(new Point(this.x+this.sprite.width,this.y));
	this.points.push(new Point(this.x+this.sprite.width,this.y+this.sprite.height));
	this.points.push(new Point(this.x,this.y+this.sprite.height));
}

SpriteShape.prototype.stroke=function(ctx){
	this.sprite.paint(ctx);
	// this.setPolyPoints();
}

//多变形碰撞求最小平移量
function polygonCollidesWithPolygon(p1,p2){
	var mtv1=p1.minmumTranslationVector(p1.getAxes(),p2),
	    mtv2=p1.minmumTranslationVector(p2.getAxes(),p2);
	if(mtv1.overlap==0&&mtv2.overlap==0){
		return{
			axis:undefined,
			overlap:0
		}
	}
	else{
		return mtv1.overlap>mtv2.overlap? mtv2:mtv1;
	}
}

//两个圆形碰撞
function circleCollidesWithCircle(c1,c2){
	var distance=Math.sqrt(Math.pow((c1.x-c2.x),2)+Math.pow((c1.y-c2.y),2));
	var overlap=Math.abs(c1.radius+c2.radius)-distance;
	if(overlap<0){
		return new MinimumTranslationVector(undefined,0);
	}
	else{
		return new MinimumTranslationVector(undefined,overlap);
	}
}

//圆与多变形的碰撞
function getCircleAxis(circle,polygon,closePoint){
	var v1=new Vector(circle.x,circle.y);
	var v2=new Vector(closePoint.x,closePoint.y);
	return v1.subtract(v2).normal();
}
function polygonCollidesWithCircle(polygon,circle){
	var axes=polygon.getAxes();
	closePoint=getPolygonClosestToCircle(polygon,circle);
	axes.push(getCircleAxis(circle,polygon,closePoint));
	return polygon.minmumTranslationVector(axes,circle);
}





































