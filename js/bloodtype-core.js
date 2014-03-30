/*
 * 
 * BTGame 一个人物模拟游戏
 * 
 * avatar 类
 * 2013.11-12
 * 
 * author:yu_dong_han@hotmail.com
 * 
 * 参数：
 * 
 * age 默认 默认（随机）
 * job 默认 默认（随机）
 * ismale -> this.sex 默认（随机）
 * height 默认（随机）
 * weight 默认 （随机）
 * fname  默认（随机）
 * lname 默认（随机）
 * blood1 默认（随机）
 * blood2 默认 （随机）
 * description 默认（随机）
 * 
 * salary 默认（随机）
 * grade 学历 默认（随机）
 * */
function Avatar(cs){
	if(typeof cs !== "object") throw new Error("avatar need object");
	//年龄
	//var age = (typeof cs.age !== "undefined") ? cs.age : randomNumber(0,2);
	//财富
	var salary = (typeof cs.salary !== "undefined") ? cs.salary : randomNumber(0,15000);
	
	//知识
	var grade = (typeof cs.grade !== "undefined") ? cs.grade : randomNumber(1,7);
	
	//性别判断
	var ismale = cs.ismale || randomNumber(0,1);
	var sex = ismale ? "M" : "F";
	
	//图片判断
	var imgpath = ismale ? "male" : "female";
	var img = "img/"+imgpath+"/"+randomNumber(1,8)+".jpg";
	
	//返回身高
	var height = (typeof cs.height !== "undefined") ? cs.height : (ismale ? randomNumber(160,195,1) : randomNumber(145,180,1));
	
	//体重指数
	var bmi = (typeof cs.bmi !== "undefined") ? cs.bmi : randomNumber(15,40,2);
	
	
	var weight = (bmi*(height/100)*(height/100)).toFixed(2);
	
	/*var reBMI = function(){
		bmi = Number((weight/(height*height)*10000).toFixed(2));
	}
	reBMI();
	*/
	
	//体重
	//var weight = (typeof cs.weight !== "undefined") ? cs.weight : (ismale ? randomNumber(55,120) : randomNumber(40,95));
	
	
	
	//返回姓名
	var fname = (typeof cs.fname !== "undefined") ? cs.fname : returnRandomItem(FNamePool,1);
	var lname = (typeof cs.lname !== "undefined") ? cs.lname : returnRandomItem(ismale ? LNamePool.boy : LNamePool.girl,1);
	var ename = (typeof cs.ename !== "undefined") ? cs.ename : returnRandomItem(ismale ? ENamePool.boy : ENamePool.girl,1);
	var name = fname + lname;
	
	//血型判断，根据血型两个因子判断血型，并返回到公开属性blood里
	var ReturnRandomBlood = function(){
		var rnum = randomNumber(1,3);
		switch(rnum){
			case 1:
				return "A" 
				break;
			case 2:
				return "B" 
				break;
			case 3:
				return "i" 
				break;
			default:
				return "i";
		}
	}
	
	var blood1 = (typeof cs.blood1 !== "undefined") ? cs.blood1 : ReturnRandomBlood();
	var blood2 = (typeof cs.blood2 !== "undefined") ? cs.blood2 : ReturnRandomBlood();
	var ReturnBlood = function(){
		if(blood1 === "i" || blood2 === "i"){
			if(blood1 === "i" && blood2 === "i"){
				return "O"
			}else if(blood1 === "i"){
				return blood2;
			}else if(blood2 === "i"){
				return blood1;
			}
		}else{
			return "AB"
		}
	}
	var blood = ReturnBlood();
	
	//职业
	var randomjob = returnRandomItem(JobPool,1)[0];
	
	//职业匹配指数
	var jobfixindex = 0;
	
	/*
	var reJobFixIndex = function(){
		jobfixindex = 0;
		var jobreg = [new RegExp(blood1),new RegExp(blood2),new RegExp(sex)]
		
		for(i in jobreg){
			if(jobreg[i].test(randomjob.fit)){
				jobfixindex++
			}
		}
	}
	*/
	//reJobFixIndex();
	
	var job = (typeof cs.job !== "undefined") ? cs.job : randomjob.job;
	
	//生成文字描述
	var randomDescription = function(){
		
		var b1array = returnRandomItem(DesPool[blood1],randomNumber(1,5)),
			b2array = returnRandomItem(DesPool[blood2],randomNumber(1,5));
		var desarray = b1array.concat(b2array);
		var deswords = desarray.join(',') + "。";
		
		return deswords;
	}
	
	var description = (typeof cs.description !== "undefined") ? cs.description : randomDescription();
	
	var point = 0;
	var countBMI = function(){
		//reBMI();
		switch(true){
			case (Math.floor(bmi) === 22):
				point += 100
				break;
			case (bmi>18) && (bmi < 28):
				point += 50
				break;
			case (bmi<=18) || (bmi>=35):
				point -= 50
				break;
				
		}
	}
	var countGrade = function(){
		switch(grade){
			case 2 : point += 20;break;
			case 3 : point += 50;break;
			case 4 : point += 80;break;
			case 5 : point += 120;break;
			case 6 : point += 160;break;
			case 7 : point += 200;break;
		}
	}
	
	var countJobFit = function(){
		//reJobFixIndex();
		switch(jobfixindex){
			case 1 : point += 100;break;
			case 2 : point += 180;break;
			case 3 : point += 250;break;
		}
	}
	
	var countSalary = function(){
		point += salary/100;
	}
	
	var countPoint = function(){
		countGrade(point);
		countBMI(point);
		countJobFit(point);
		countSalary(point);
		
		point = Math.floor(point);
	}
	
	countPoint();
	
	//var dom = $('<div class="avatar_dom"></div>');
	var dom = $('<tr></tr>');
	
	
	
	
	this.getSex = function(){return sex;}
	//this.getAge = function(){return age;}
	this.getHeight = function(){return parseInt(height);}
	this.getWeight = function(){return parseInt(weight);}
	this.getBlood1 = function(){return blood1;}
	this.getBlood2 = function(){return blood2;}
	this.getFname = function(){return fname;}
	this.getName = function(){return name;}
	this.getDom = function(){return dom;}
	this.getPoint = function(){return point;}
	
	this.generated = false;
	//展现人物的方法，放到pool里面
	this.Generate = function(){
		//计算分数
		//countPoint();
		
		dom.append($('<td><input type="checkbox" class="avatar_choose" value="'+Avatar.index+'"></td>'));
		dom.append($('<td>'+name+'</td>'));
		dom.append($('<td>'+ename+'</td>'));
		dom.append($('<td>'+sex+'</td>'));
		dom.append($('<td>'+height+'cm</td>'));
		dom.append($('<td>'+weight+'kg</td>'));
		dom.append($('<td>'+bmi+'</td>'));
		dom.append($('<td>'+blood+'</td>'));
		dom.append($('<td>'+job+'</td>'));
		dom.append($('<td>'+salary+'</td>'));
		dom.append($('<td>'+grade+'</td>'));
		dom.append($('<td>'+point+'</td>'));
		dom.append($('<td style="display:none">'+description+'</td>'));
		dom.append($('<td style="display:none">'+img+'</td>'));
		
		
		if(!this.generated){
			AvatarPool[Avatar.index] = this;
			Avatar.index ++;
			$('#avatar_table').append(dom);
		}
		this.generated = true;
		dom.click();
		Avatar.updateData();
	}
	/*
	this.older = function(){
		if(age === 4){
			return;
		}
		age++;
		this.Generate();
	}
	*/
	this.married = false;
	
	this.earnMore = function(){
		salary+=salary*0.1;
		salary = Math.floor(salary);
		this.Generate();
	}
	this.upgrade = function(){
		grade++;
		this.Generate();
	}
	this.taller = function(){
		height += height*0.02;
		height = Math.floor(height);
		this.Generate();
	}
	this.loseWeight = function(){
		weight -= weight*0.02;
		weight = Math.floor(weight);
		this.Generate();
	}
	this.changeJob = function(){
		job = returnRandomItem(JobPool,1)[0].job;
		this.Generate();
	}
	this.remove = function(){
		dom.remove();
		removeItem(AvatarPool,this);
		Avatar.index --;
		this.Generate();
	}
	
}//Avatar Class end here

//打印操作
Avatar.con = function(c){
	$('#console').html(c)
};

//更新全局信息
Avatar.index = 0;
Avatar.point = 0;
Avatar.updateData = function(){
	var mnum = 0,wnum = 0;
	Avatar.point = 0;
	for(var i in AvatarPool){
		Avatar.point += AvatarPool[i].getPoint()
		if(AvatarPool[i].getSex() == "M"){
			mnum++;
		}else{
			wnum++;
		}
	}
	$('#score').html(Math.floor(Avatar.point/AvatarPool.length));
	$('#people').html(AvatarPool.length);
	$('#man').html(mnum);
	$('#woman').html(wnum);
}
