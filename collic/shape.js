/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-26 10:24:23
 * @version $Id$
 */
var Shape=function(){
	this.x=undefined;
	this.y=undefined;
	this.strokeStyle="rgba(255,253,208.0.9)";
	this.fillStyle="rgba(147,197,114,0.8)";
}

Shape.prototype={
	collidesWith:function(anotherShape){//判断和antherShape是否碰撞
		var axes=this.getAxes().concat(anotherShape.getAxes());
		// console.log(axes.length);
		return !this.separationOnAxes(axes,anotherShape);
	},

	separationOnAxes:function(axes,anotherShape){
		for(var i=0;i<axes.length;i++){
			var axis=axes[i];
			var projection1=anotherShape.project(axis);
			var projection2=this.project(axis);
			if(!projection1.overlaps(projection2)){//检测到有一条边分离即为分离
				return true;
			}
		}
		return false;
	},

	//计算最小平移量
	minmumTranslationVector:function(axes,shape){
		var minmumoverlap=10000,
		    overlaps,
		    axisWithSmallestOverlap;

		for(var i=0;i<axes.length;i++){
			axis=axes[i];
			projection1=shape.project(axis);
			projection2=this.project(axis);
			overlaps=projection1.getOverlap(projection2);
			if(overlaps===0){
				return {
					axis:undefined,
					overlap:0
				};
			}
			else{
				if(overlaps<minmumoverlap){
					minmumoverlap=overlaps;
					axisWithSmallestOverlap=axis;
				}
			}
		}
		return {
			axis:axisWithSmallestOverlap,
			overlap:minmumoverlap
		};
	},


	//返回多变形的所有Vector对象的合集
	getAxes:function(){
		throw "getAxes() not implemented";
	},

	//返回Projection  对象
	project:function(axis){
		throw "project not implemented";
	},

	move:function(dx,dy){
		throw "move not implemented";
	},

	//draw method
	createPath:function(ctx){
		throw "createPath not implemented";
	},

	fill:function(ctx){
		ctx.save();
		ctx.fillStyle=this.fillStyle;
		this.createPath(ctx);
		ctx.fill();
		ctx.restore();
	},

	stroke:function(ctx){
		ctx.save();
		ctx.strokeStyle=this.strokeStyle;
		this.createPath(ctx);
		ctx.stroke();
		ctx.restore();
	},

	isPointInPath:function(ctx,x,y){
		// alert("kk");
		this.createPath(ctx);
		return ctx.isPointInPath(x,y);
	}
}

















