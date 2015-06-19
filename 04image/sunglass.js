/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-15 11:02:31
 * @version $Id$
 */
function mojing(e){
	var imgData=e.data,
	    data=imgData.data,
	    width=imgData.width;
	for(var i=0;i<data.length;i++){
      if ((i+1) % 4 != 0) {   
         if ((i+4) % (width*4) == 0) { // last pixel in a row
            data[i] = data[i-4];
            data[i+1] = data[i-3];
            data[i+2] = data[i-2];
            data[i+3] = data[i-1];
            i+=4;
         }
         else {
           data[i] = 2*data[i] - data[i+4] - 0.5*data[i+4];
         }
      }
	}
	postMessage(imgData);
}
addEventListener("message",mojing,false);
