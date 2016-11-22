/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-18 11:16:52
 * @version $Id$
 */
var Sprite=function (name,painter,behaviors){//
	if(name !== undefined) this.name=name;
	if(painter !== undefined) this.painter=painter;
	this.top=0;
	this.left=0;
	this.width=10;
	this.height=10;
	this.velocityX=50;
	this.velocityY=10;
	this.visible=true;//控制绘制器的绘制是否可见
	this.animating=false;
	this.behaviors=behaviors||[];
	return this;
}
Sprite.prototype={
	//绘制方法
	paint:function(ctx){
		if(this.painter!==undefined && this.visible){
			// alert("lplp");
			this.painter.paint(this,ctx);
		}
	},
	update:function(ctx,time){
		for(var i=0;i<this.behaviors.length;i++){
			this.behaviors[i].execute(this,ctx,time);
		}
	}
}
