/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-13 11:48:08
 * @version $Id$
 */
function drawRoundText(ctx,text,x,y,radius){
	var length=text.length;
	var step=Math.PI*2/length;
	var angel=0;
	var i=0;
	for(i;i<length;i++){
		angel=step*i;
		pos_x=x+Math.cos(angel)*radius;
		pos_y=y-Math.sin(angel)*radius;
		ctx.save();
		ctx.font="50px Arial";
		ctx.translate(pos_x,pos_y);
		ctx.rotate(Math.PI/2-angel);
		console.log(text[i]);
		ctx.fillText(text[i],0,0);
		ctx.restore();
	}
}
