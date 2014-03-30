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
var findOne = function(){
	var newavatar = new Avatar({});
	newavatar.Generate();
	Avatar.con(newavatar.getName()+"被创造了出来！")
}

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
$('#avatar_table').on('click','.avatar_choose',function(){
	var _name = $(this).parent('td').next().html();
	if($(this).is(':checked')){
		Avatar.con("你选中了" + _name);
	}else{
		Avatar.con("你取消选中了" + _name);
	}
})
/*
 * 随机产生
 */
$('#random_avatar').click(function(){
	findOne();
})

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
for(var i = 0;i<11;i++){
	findOne();
}
=======
>>>>>>> master
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();
findOne();

<<<<<<< HEAD
=======
>>>>>>> 40366b2cb0031ffd639da574b67f0de03a75b984
>>>>>>> master
var table = $("#avatar_table");
    
$('#avatar_table th')
    .wrapInner('<span title="sort this column"/>')
    .each(function(){
        
        var th = $(this),
            thIndex = th.index(),
            inverse = false;
        
        th.click(function(){
            table.find('td').filter(function(){
                
                return $(this).index() === thIndex;
                
            }).sortElements(function(a, b){
                
                return $.text([a]) > $.text([b]) ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;
                
            }, function(){
                
                // parentNode is the element we want to move
                return this.parentNode; 
                
            });
            
            inverse = !inverse;
                
        });
            
    });