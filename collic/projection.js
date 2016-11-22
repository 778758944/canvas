/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-26 10:18:04
 * @version $Id$
 */
//创建投影对象
var Projection=function(min,max){
	this.min=min;
	this.max=max;
}

Projection.prototype={
	overlaps:function(projection){
		return this.max>projection.min&&projection.max>this.min;//ture为重合
	}
}
