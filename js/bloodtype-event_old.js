/*
 * 
 * BTGame 一个人物模拟游戏
 * 
 * 一些事件方法
 * 2013.11-12
 * 
 * author:yu_dong_han@hotmail.com
 * 
 * */
var bornOne = function(av1,av2){
	if (!(av1 instanceof Avatar && av2 instanceof Avatar)) return;
	if(av1.getSex() === av2.getSex()){
		alert('拒绝同性恋！');
		return;
	}
	/*
	if(av1.getAge() === 3 || av2.getAge() === 3){
		alert('其中一个人已经挂了');
		return;
	}
	if(av1.getAge() !== av2.getAge()){
		alert('不在同一个年龄阶段的人无法产生后代');
		return;
	}
	if(av1.married || av2.married){
		alert('其中一人已婚');
		return;
	}
	
	av1.married = true;
	av2.married = true;
	*/
	
	var	newfname = (av1.getSex() === "M") ? av1.getFname(): av2.getFname();
	
	var newismale = Boolean(randomNumber(0,1));
	//女人身高-5*随机，男人身高+5×随机
	var newheight = newismale ? 
			Math.floor((av1.getHeight() + av2.getHeight())/2 + Math.random()*5):
			Math.floor((av1.getHeight() + av2.getHeight())/2 - Math.random()*5)
	var newweight = newismale ? 
			Math.floor((av1.getWeight() + av2.getWeight())/2 + Math.random()*5):
			Math.floor((av1.getWeight() + av2.getWeight())/2 - Math.random()*5)
	var newavatar = new Avatar({
		blood1 : randomNumber(0,1) ? av1.getBlood1() : av1.getBlood2(),
		blood2 : randomNumber(0,1) ? av2.getBlood1() : av2.getBlood2(),
		ismale: newismale,
		height : newheight,
		weight : newweight,
		fname : newfname
	});
	
	newavatar.Generate();
	Avatar.con(av1.getName()+'和'+av2.getName()+"结婚了！他们的孩子是"+ newavatar.getName());
}

var makeOne = function(){
	var fname = $("#create_box").find('input[name="fname"]').val(),
	 	lname = $("#create_box").find('input[name="lname"]').val(),
		ismale = Number($("#create_box").find('select[name="sex"]').val()),
		blood1 = $("#create_box").find('select[name="blood1"]').val(),
		blood2 = $("#create_box").find('select[name="blood2"]').val(),
		height = $("#create_box").find('input[name="height"]').val(),
		weight = $("#create_box").find('input[name="weight"]').val();
	var newavatar = new Avatar({
		blood1 : blood1,
		blood2 : blood2,
		fname : fname,
		lname : lname,
		ismale: ismale,
		height : height,
		weight : weight,
		age:0
	});
	newavatar.Generate();
}
/*
var findOne = function(){
	var newavatar = new Avatar({});
	newavatar.Generate();
	return newavatar;
};
*/
//结婚
var marry = function(){
	//$('#type1').show();
	/*
	$( "#type1 .place" ).droppable({
      drop: function( event, ui ) {
      	var dragid = $(ui.draggable[0]).find('input[type=hidden]').val();
        $(this).addClass( "highlight" ).find('input[type=hidden]').val(dragid);
        if(!($(this).siblings('.place').find('input[type=hidden]').val() == "")){
        	$("#type1 button").show();
        };
      },
      out: function( event, ui ) {
      	$( this ).removeClass("highlight").find('input[type=hidden]').val("");
      	$("#type1 button").hide();
      }
    });
	*/
	/*
	$("#type1 button").click(function(){
		var a1 = $( "#type1 #marry1" ).val();
		var a2 = $( "#type1 #marry2" ).val();
		
		bornOne(AvatarPool[a1],AvatarPool[a2]);
		
		Avatar.con(AvatarPool[a1].getName()+AvatarPool[a2].getName()+"结婚了！")
		$("#type1").hide();
	})
	*/
	
	
	
	
};
/*
$('#marry').click(function(){
	$('#avatar_table').off("click",'tr',ShowStage);
	
	Avatar.con("勾选两个异性结婚");
	$('#act_marry').slideDown();
})
*/
$('#marry').click(function(){
	if($('#avatar_table .avatar_choose:checked').length == 2){
		
			var a1 = $('#avatar_table .avatar_choose:checked').eq(0).val();
			var a2 = $('#avatar_table .avatar_choose:checked').eq(1).val();
			
			bornOne(AvatarPool[a1],AvatarPool[a2]);
			
	}else{
		Avatar.con("请选择正好两个异性来结合！");
		alert('选择数量不对');
		return false;
	}
})

/*
 * 选择的提示
 */
/*
$('#avatar_table').on('click','.avatar_choose',function(){
	var _name = $(this).parent('td').next().html();
	if($(this).is(':checked')){
		//Avatar.con("你选中了" + _name);
	}else{
		Avatar.con("你取消选中了" + _name);
	}
})
*/
/*
 * 随机产生
 */
$('#random_avatar').click(function(){
	var newavatar = new Avatar({});
	newavatar.Generate();
	Avatar.con(newavatar.getName()+"被创造了出来！")
})
/*
//创造一个人
var create = function(){
	$('#type2').show();
	$('#type2 #create_box button').click(function(){
		makeOne();
	})
};
$('#create').click(function(){
	create();
})

//闪电袭击
var lighting = function(){
	var randomone = returnRandomItem(AvatarPool,1)[0];
	Avatar.con(randomone.getName()+"被闪电击中！")
	randomone.remove();
};
$('#lighting').click(function(){
	lighting();
})

//暴动
var revolution = function(){
	if(AvatarPool.length < 2){
		Avatar.con("人数太少无法暴动！");
		return;
	};
	var pnum = randomNumber(2,4);
	
	if(pnum > AvatarPool.length){
		pnum = AvatarPool.length;
	}
	var randomones = returnRandomItem(AvatarPool,2);
	
	var names = "";
	for(var i in randomones){
		if(i == 0){
			names += randomones[i].getName()+"带领";
		}else{
			names += randomones[i].getName();
		}
		randomones[i].remove();
	}
	Avatar.con(names + "发生了暴动！")
};
$('#revolution').click(function(){
	revolution();
})

//顿悟
var realize = function(){
	var randomone = returnRandomItem(AvatarPool,1)[0];
	
	switch(randomNumber(0,4)){
		case 0 :
			randomone.earnMore();
			Avatar.con(randomone.getName()+"通过贿赂领导，收入提高10%");
			break;
		case 1 :
			randomone.upgrade();
			Avatar.con(randomone.getName()+"购买假文凭，学历提升一级");
			break;
		case 2 :
			randomone.taller();
			Avatar.con(randomone.getName()+"通过锻炼，身高有所增加");
			break;
		case 3 :
			randomone.loseWeight();
			Avatar.con(randomone.getName()+"减肥成功，体重有所减少");
			break;
		case 4 :
			randomone.changeJob();
			Avatar.con(randomone.getName()+"更改了自己的工作");
			break;
	}
	
};
$('#realize').click(function(){
	realize();
})
*/
/*
function RandomShowCard(num,clear){
	if(clear == true){
		$('#card_pool').html('');
	}
	var cards = returnRandomItem(Cards,num);
	for(var i in cards){
		var _chtml = $('<div>',{
			class:"card"
		})
		_chtml.append('<p onclick="'+cards[i].cardfunction+'()">'+cards[i].cardname+'</p>');
		
		$('#card_pool').append(_chtml);
	}
	Avatar.con("随机出现了" + num + "张牌！")
}

$('#gcard').click(function(){
	var _n = ($('#cardnum').val())?$('#cardnum').val():5;
	RandomShowCard(_n);
	findOne();
})
*/

function ShowStage(){
	if($(this).find('th').length > 0) return;
	var _id = $(this).children('td').eq(0).html();
	var _name = $(this).children('td').eq(1).html();
	var _ename = $(this).children('td').eq(2).html();
	var _sex = $(this).children('td').eq(3).html();
	var _height = $(this).children('td').eq(4).html();
	var _weight = $(this).children('td').eq(5).html();
	var _bmi = $(this).children('td').eq(6).html();
	var _blood = $(this).children('td').eq(7).html();
	var _job = $(this).children('td').eq(8).html();
	var _salary = $(this).children('td').eq(9).html();
	var _grade = $(this).children('td').eq(10).html();
	var _point = $(this).children('td').eq(11).html();
	var _description = $(this).children('td').eq(12).html();
	var _img = $(this).children('td').eq(13).html();
	
	
	$(this).addClass('chosen').siblings('tr').removeClass('chosen');
	
	
	
	$('#avatar_stage .at_id').html(_id);
	$('#avatar_stage .at_name').html(_name);
	$('#avatar_stage .at_ename').html(_ename);
	$('#avatar_stage .at_sex').html(_sex);
	$('#avatar_stage .at_height').html(_height);
	$('#avatar_stage .at_weight').html(_weight);
	$('#avatar_stage .at_bmi').html(_bmi);
	$('#avatar_stage .at_blood').html(_blood);
	$('#avatar_stage .at_job').html(_job);
	$('#avatar_stage .at_salary').html(_salary);
	$('#avatar_stage .at_grade').html(_grade);
	$('#avatar_stage .at_point').html(_point);
	$('#avatar_stage .at_description').html(_description);
	$('#avatar_stage .at_img').attr('src',_img);
	
	
	//Avatar.con("选中" + _name);
}



$('#avatar_table').on("click",'tr',ShowStage);
