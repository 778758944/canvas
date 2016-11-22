/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-23 09:46:35
 * @version $Id$
 */

var cvs = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),

    RIGHT = 1,
    LEFT = 2,
    ARROW_MARGIN = 10,
    BALL_RADIUS  = 15,
    LEDGE_LEFT   = 150,
    LEDGE_TOP    = 90,
    LEDGE_WIDTH  = 44,
    LEDGE_HEIGHT = 12,
    ANIMATION_DURATION = 200,

    THRUSTER_FILL_STYLE = 'rgba(100,140,230,0.8)',
    THRUSTER_FIRING_FILL_STYLE = 'rgba(255,255,0,0.8)',

    lastTime = 0,
    arrow = LEFT,

    pushTimer=new AnimationTimer(ANIMATION_DURATION),

    moveBall={
    	lastTime:undefined,

    	resetBall:function(){
    		ball.left=LEFT+LEDGE_WIDTH/2-BALL_RADIUS;
    		ball.top=LEDGE_TOP-BALL_RADIUS*2;
    	},

    	execute:function(sprite,context,time){
    		var timerElapsed=pushTimer.getElapsedTimer(),
    		    frameElapsed;

    		if(pushTimer.running()&&this.frameElapsed!= undefined){
    			if(arrow==LEFT){
    				sprite.left=sprite.left+sprite.velocityX*(frameElapsed/1000);
    			}
    			else{
    				sprite.left=sprite.left-sprite.velocityY*(frameElapsed/1000);
    			}
    			if((isBallOnLedge()&&pushTimer.isOver())||!isBallOnLedge()){
    				pushTimer.stop();
    			}
    			if(!isBallOnLedge()){
    				this.resetBall();
    			}
    		}
    		this.frameElapsed=timerElapsed;
    	}

    },

    var ball=new sprite("ball",{
    	paint:function(sprite,ctx){
    		ctx.save();
    		ctx.fillStyle="#f00";
    		ctx.strokeStyle="#00f";
    		ctx.beginPath();
    		ctx.arc(sprite.left,sprite.top,BALL_RADIUS,Math.PI*2,false);
    		ctx.stroke();
    		ctx.fill();
    		ctx.restore();
    	}
    },[moveBall]);

    function restartAnimation(){
    	if(pushTimer.isRunning()){
    		pushTimer.stop();//停止动画，纪录动画已经执行的时间
    	}
    	pushTimer.start();//开始动画，从零开始统计动画时间
    }

    function pushBallLeft(){
    	arrow=LEFT;
    	restartAnimation();
    }

    function pushBallRight(){
    	arrow=RIGHT;
    	restartAnimation();
    }

    function isBallOnLedge(){
    	return ball.left+2*BALL_RADIUS>LEDGE_LEFT&&ball.left<LEDGE_LEFT+LEDGE_WIDTH;
    }

    function animate(){
    	ctx.clearRect(0,0,cvs.width,cvs.height);
    	ball.update();
    	ball.paint(ctx);
    }



























