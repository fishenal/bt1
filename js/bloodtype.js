var NamePool = {
	girl : [
		'Amy','Bella','Candy','Cherry','Ella','Grace','Haley','Jane','Kate','Laura','Linda','Mary','Nancy','Olivia','Pearl','Sherry','Vera','Wendy'
	],
	boy:[
		'Andy','Bill','Carl','David','Eric','Fred','Harry','Jim','Leo','Mark','Peter','Richard','Steve','Tony','Tim','Vincent','Zack'
	]
}

var IDPool = [0]

var AvatarPool = []

function Avatar(cs){
	
	//性别判断
	var ismale = cs.ismale;
	this.sex = ismale ? "M" : "F";
	
	//图片判断
	var imgpath = ismale ? "male" : "female";
	var imgnum = randomNumber(1,8);
	this.img = "img/"+imgpath+"/"+imgnum+".jpg";
	
	//返回身高
	this.height = cs.height || (ismale ? randomNumber(160,195) : randomNumber(145,180));
	
	//返回姓名
	var namepool = ismale ? NamePool.boy : NamePool.girl;
	var ReturnRandomName = function(){
		var rseed = randomNumber(0,namepool.length-1);
		return namepool[rseed];
	}
	this.name = ReturnRandomName();
	
	//返回ID
	this.id = IDPool[IDPool.length - 1] + 1;
	IDPool.push(this.id);
	AvatarPool.push(this);
	
	//血型判断，根据血型两个因子判断血型，并返回到公开属性blood里
	this.blood1 = cs.blood1 || "i";
	this.blood2 = cs.blood2 || "i";
	this.ReturnBlood = function(){
		if(this.blood1 === "i" || this.blood2 === "i"){
			if(this.blood1 === "i" && this.blood2 === "i"){
				return "O"
			}else if(this.blood1 === "i"){
				return this.blood2;
			}else if(this.blood2 === "i"){
				return this.blood1;
			}
		}else{
			return "AB"
		}
	}
	this.blood = this.ReturnBlood();
	
	
	//展现人物的方法，放到pool里面
	this.ShowAvatar = function(){
		var $newone = $('.avatar_template').clone()
		.removeClass('avatar_template').addClass('avatar_item')
		.data('id',this.id);
		
		$newone.appendTo('#avatar_box').show();
		
		$newone.find('.at_img').attr('src',this.img);
		$newone.find('.at_name').html(this.name);
		$newone.find('.at_sex').html(this.sex);
		$newone.find('.at_height').html(this.height+"cm");
		$newone.find('.at_blood').html(this.blood);
		
		$newone.find('.at_id').html(this.id);
		
		console.log(this.id)
	}
	
	this.ShowAvatar();
	
	//结婚
	this.ReturnChildren = function(partner){
		if(this.sex === partner.sex){
			alert('No homosexuality');
			return;
		}
		var newismale = Boolean(randomNumber(0,1));
		//女人身高-5，男人身高+5
		var newheight = newismale ? (this.height + partner.height)/2 + 5:(this.height + partner.height)/2 - 5
		return {
			blood1 : randomNumber(0,1) ? this.blood1 : this.blood2,
			blood2 : randomNumber(0,1) ? partner.blood1 : partner.blood2,
			ismale: newismale,
			height : newheight
		}
	}
}
console.log();
new Avatar({
	blood1:"A",
	blood2:"i",
	ismale:true
})

new Avatar({
	blood1:"B",
	blood2:"i",
	ismale:false
})

console.log(AvatarPool);
//marry

$('#marry').click(function(){
	
	var v1 = Number($('#name1').val());
	var v2 = Number($('#name2').val());
	
	//AvatarPool[v1-1].Marry(AvatarPool[v2-1]);
	
	new Avatar(AvatarPool[v1-1].ReturnChildren(AvatarPool[v2-1]))
})

