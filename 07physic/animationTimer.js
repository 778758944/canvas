/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-24 14:08:41
 * @version $Id$
 */
AnimationTimer=function(duration,timewrap){
	this.timewrap=timewrap;//速度变化的时候需要用到
	if(duration){
		this.duration=duration;
	}else{
		this.duration=1000;
	}

	this.stopwatch=new Stopwatch();
}

AnimationTimer.prototype={
	//start,stop,getRealElapsedTime,getElapsedTime,isRunning,isOver,reset

	start:function(){
		this.stopwatch.start()
	},

	stop:function(){
		this.stopwatch.stop();
	},

	getRealElapsedTime:function(){
		return this.stopwatch.getElapsedTime();
	},

	getElapsedTime:function(){
		var elapsedtime=this.stopwatch.getElapsedTime(),//获取动画真正的执行时间
		    percent=elapsedtime/this.duration;

		if(!this.stopwatch.running){
			console.log("kk");
			return undefined;
		}

		if(this.timewrap==undefined){
			// console.log("ppp");
			return elapsedtime;
		}

		return elapsedtime*(this.timewrap(percent)/percent);
	},


	isRunning:function(){
		return this.stopwatch.isRunning();
	},

	isOver:function(){
		return this.stopwatch.getElapsedTime()>this.duration;
	},

	reset:function(){
		this.stopwatch.reset();
	}
}

//变速运动
AnimationTimer.makeEaseOut=function(strength){
	return function(percent){
		return 1-Math.pow(1-percent,strength*2);
	}
}

AnimationTimer.makeEaseIn=function(strength){
	return function(percent){
		return Math.pow(percent,strength*2);
	}
}

AnimationTimer.makeLinear=function(){
	return function(percent){
		return percent;
	}
}

AnimationTimer.makeEaseInOut=function(){
	return function(percent){
		return percent-Math.sin(percent*Math.PI*2)/(2*Math.PI);
	}
}

AnimationTimer.makeElastic = function (passes) {
   passes = passes || 3;
   return function (percent) {
       return ((1-Math.cos(percent * Math.PI * passes)) *
               (1 - percent)) + percent;
   };
};
































