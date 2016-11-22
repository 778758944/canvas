/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-28 09:05:17
 * @version $Id$
 */
var COREHTML5=COREHTML5||{};

COREHTML5.Rect=function(fillStyle,strokeStyle,wp,hp){
	this.fillStyle=fillStyle||"#f00";
	this.strokeStyle=strokeStyle||"#000";
	this.wp=wp||100;
	this.hp=hp||100;
	this.setSizePercents(wp,hp);
	this.createCvs();
	this.createDiv();
	return this;
}

COREHTML5.Rect.prototype={
	createCvs:function(){
		this.cvs=document.createElement("canvas");
		this.ctx=this.cvs.getContext("2d");
		return this;
	},

	createDiv:function(){
		this.domEle=document.createElement("div");
		this.domEle.appendChild(this.cvs);
		return this;
	},

	appendTo:function(ele){
		ele.appendChild(this.domEle);
		this.domEle.style.width=ele.offsetWidth+"px";
		this.domEle.style.height=ele.offsetWidth+"px";
		return this;
	},

	resize:function(width,height){
		this.left=(width-width*this.wp)/2;
		this.top=(height-height*this.hp)/2;
		this.radius=(this.cvs.height/2-this.top*2)/2;
		this.right=this.left+width*this.wp;
		this.bottom=this.top+height*this.hp;
		this.cvs.width=width;
		this.cvs.height=height;
	},

	setSizePercents:function(w,h){
		this.wp=w>1? (w/100):w;
		this.hp=h>1? (h/100):h;
	},

	fill:function(){
		var radius=Math.abs((this.top-this.bottom)/2);
		ctx=this.ctx;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.left,this.top);
		ctx.arcTo(this.right,this.top,this.right,this.bottom,radius);
		ctx.arcTo(this.right,this.bottom,this.left,this.bottom,radius);
		ctx.arcTo(this.left,this.bottom,this.left,this.top,radius);
		ctx.arcTo(this.left,this.top,this.right,this.top,radius);
		ctx.closePath();
		ctx.fillStyle=this.fillStyle;
		ctx.fill();
		ctx.restore();
	},

	draw:function(ctx){
		var origin;
		if(ctx){
			this.ctx=ctx;
		}
		this.fill();
	},

	erase:function(){
		this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
	}


}















