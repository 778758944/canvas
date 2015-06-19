/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-12 14:45:05
 * @version $Id$
 */
var Polygon=function(x,y,radius,slides,start,strokeStyle,fillStyle,filled){
	this.x=x;
	this.y=y;
    this.radius=radius;
	this.slides=slides;
	this.start=start;
	this.strokeStyle=strokeStyle;
	this.fillStyle=fillStyle;
	this.filled=filled;
}
Polygon.prototype={
	getPath:function(ctx){
		ctx.beginPath();
        // console.log("ss");
		ctx.moveTo(this.x+this.radius*Math.cos(this.start),this.y+Math.sin(this.start)*this.radius);
		var step=Math.PI*2/this.slides;
		var angel=step+this.start;
		for(angel;angel<=Math.PI*2+this.start;angel=angel+step){
			var posx=this.x+Math.cos(angel)*this.radius;
			var posy=this.y+Math.sin(angel)*this.radius;
			// ctx.
			ctx.lineTo(posx,posy);
		}
		return this;
	},
	getStroke:function(ctx){
		ctx.save();
		ctx.strokeStyle=this.strokeStyle;
		ctx.stroke();
		ctx.restore();
		return this;
	},
	getFill:function(ctx){
		ctx.save();
		ctx.fillStyle=this.fillStyle;
		ctx.fill();
		ctx.restore();
		return this;
	}
}
