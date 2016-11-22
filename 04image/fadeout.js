/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-16 10:15:50
 * @version $Id$
 */
function handle(e){
	// alert("ye");
	var data1=e.data.data1,
	    data2=e.data.data2,
	    steps=e.data.step,
	    num=0;
	for(var i=3;i<data1.data.length;i+=4){
		data1.data[i]=0;
	}
	var timer=setInterval(function(){
		// alert(sds);
		num=num+1;
		if(num>=steps){
			// alert(asds);
			clearInterval(timer);
		}
		else{
			// alert(sds);
			for(var k=3;k<data2.data.length;k+=4){
				// alert(sds);
				var alpha=data2.data[k];
				step=alpha/steps;
				if(data1.data[k]+step<alpha){
					data1.data[k]=data1.data[k]+step;
				}else{
					data1.data[k]=alpha;
				}
			}
			postMessage(data1);
		}
	},16);
}
addEventListener("message",handle,false);
