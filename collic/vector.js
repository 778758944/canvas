/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-26 09:56:04
 * @version $Id$
 */

var MinimumTranslationVector=function(axis,overlap){
	this.axis=axis;
	this.overlap=overlap;
}

var Vector=function(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype={
	//获取向量大小
	getMagnitude:function(){
		return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
	},

	//向量相加
	add:function(vector){
		var v=new Vector();
		v.x=this.x+vector.x;
		v.y=this.y+vector.y;
		return v;
	},

	//向量相减
	subtract:function(vector){
		var v=new Vector();
		v.x=this.x-vector.x;
		v.y=this.y-vector.y;
		return v;
	},

	//向量相乘
	dotProduct:function(vector){
		return this.x*vector.x+this.y*vector.y;
	},

	//边缘向量
	edge:function(vector){
		return this.subtract(vector);
	},

	//计算一个向量的法向量
	perpendicular:function(){
		var v=new Vector();
		v.x=this.y;
		v.y=0-this.x;
		return v;
	},

	//向量方向计算
	normalize:function(){
		var v=new Vector();
		var m=this.getMagnitude();
		if(m!=0){
			v.x=this.x/m;
			v.y=this.y/m;
		}
		return v;
	},

	normal:function(){
		var p=this.perpendicular();
		return p.normalize();
	}
}

//投影对象
var Projection=function(min,max){
	this.min=min;
	this.max=max;
}

Projection.prototype={
	overlaps:function(projection){
		return this.max>projection.min&&projection.max>this.min;//ture为重合
	},

	//获取最小平移量
	getOverlap:function(projection){
		if(!this.overlaps(projection)){
			return 0;
		}
		else{
			if(this.max>projection.max){
				return projection.max-this.min;
			}
			else{
				return this.max-projection.min;
			}
		}
	}
}


































