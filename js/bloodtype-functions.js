/*
 * 
 * BTGame 一个人物模拟游戏
 * 
 * 一些公用方法
 * 2013.11-12
 * 
 * author:yu_dong_han@hotmail.com
 * 
 * */
/*包含的随机数*/
var randomNumber = function(min,max,fixnum){
    if (max == null) {
	      max = min;
	      min = 0;
    }
    //return min + Math.floor(Math.random() * (max - min + 1));
    if(typeof fixnum !== "undefined"){
    	return (min + Math.random() * (max - min + 1)).toFixed(fixnum);
    }
    return min + Math.floor(Math.random() * (max - min + 1));
    
};

/*返回数组中的随机项
 * 返回的是一个数组！
 */
var returnRandomItem = function(array,number){
	  var newarray = [];
	  var copyarray = array.slice(0);;
	  var length = copyarray.length;
	  var n = number;
	  if (n > length) throw new Error('require bigger than array');
	  while(n){
	  	 var rindex = randomNumber(0,length-1);
	  	 
	  	 newarray.push(copyarray[rindex]);
	  	 copyarray.splice(rindex,1);
	  	 
	  	 n--;
	  	 length--;
	  }
	  return newarray;	  
}

var removeItem = function(array,item){
	var index = array.indexOf(item);
	if (index > -1) {
	    array.splice(index, 1);
	}
}
