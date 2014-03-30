/*包含的随机数*/
var randomNumber = function(min,max){
    if (max == null) {
	      max = min;
	      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};