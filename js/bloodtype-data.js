/*
 * 
 * BTGame 一个人物模拟游戏
 * 
 * 一些数据
 * 2013.11-12
 * 
 * author:yu_dong_han@hotmail.com
 * 
 * */

var IDPool = [0]

var AvatarPool = []

var FNamePool = ["李","王","张","刘","陈","杨","赵","黄","周","吴","徐","孙","胡","朱","高","林","何","郭","马","罗","梁","宋","郑","谢","韩","唐","冯","于","董","萧","程","曹","袁","邓","许","傅","沈","曾","彭","吕","苏","卢","蒋","蔡","贾","丁","魏","薛","叶","阎","余","潘","杜","戴","夏","钟","汪","田","任","姜","范","方","石","姚","谭","廖","邹","熊","金","陆","郝","孔","白","崔","康","毛","邱","秦","江","史","顾","侯","邵","孟","龙","万","段","雷","钱","汤","尹","黎","易","常","武","乔","贺","赖","龚","文"]

var LNamePool = {
	girl : [
		'安妮','贝丽','冰冰','冰莹','莹','彩萱','楚云','春芳','雨','采文','文','桃','梅','丹','蝶梦','雅','朵儿','芳','菲菲','芬芬','桂芝','兰','飞雪','含香','和美','美','欢欣','华楚','红叶','季雅','嘉丽','悦','姣姣','菁菁','金枝','今歌','筠溪','君丽','可儿','兰梦','丽泽','伶伶','珑玲','流婉','曼','梦','孟阳','玟玉','玉','敏丽','敏','慕诗','诗','娜','妮','念念','静','雪','暖暖','平乐','萍雅','萍','清秋','千秋','秋','俏美','琴音','奇颖','颖','秋阳','琼岚','曲静','冉冉','蓉蓉','如馨','若云','莎莎','诗蕾','书艺','丝琪','思凡','天悦','陶然','婷美','童童','文姝','韦柔','宛曼','文瑶','希恩','夏彤','仙仪','向晨','晓曼','晓兰','晓燕','笑雯','心宜','欣可','秀丽','玄清','雪儿','雪曼','雅安','嫣然','彦红','燕妮','一南','依白','瑶岑','怡月','忆敏','以晴','茵茵','音悦','盈','悠','竹','月','飞','韵梅','真茹','子凡','子亦','芷文','紫桐'
	],
	boy:[
		'安福','宾鸿','彬彬','博超','超','波鸿','鸿','波','博文','博','成化','承望','德容','德明','明','飞白','飞扬','鹏','高轩','高阳','阳','光辉','高远','国兴','光启','涵亮','亮','瀚海','和畅','浩','弘义','弘懿','华翰','鸿卓','坚白','嘉悦','荣','建柏','景澄','经武','季同','开诚','凯旋','康胜','胜','乐邦','力强','强','乐游','茂才','明志','明远','敏才','朋义','彭彭','鹏鹍','鹏飞','奇迈','祺祥','锐逸','睿识','绍祺','思源','泰河','天华','天路','同甫','天纵','天','巍奕','伟才','文柏','文昌','伟泽','伟','文彦','向晨','晓博','心远','欣然','信瑞','兴腾','兴思','星波','修诚','修谨','学文','雪峰','雅昶','宜民','阳德','阳秋','毅然','英达','英范','英勋','永康','永丰','勇军','雨信','玉泉','宇航','元凯','越彬','煜祺','勇毅','烨霖','永逸','星剑','剑','展鹏','正平','正奇','智明','志国','子真','子石','子瑜','正谊','智渊','智','曾琪'
	]
}
var ENamePool = {
	girl : [
		'Amy','Bella','Candy','Cherry','Ella','Grace','Haley','Jane','Kate','Laura','Linda','Mary','Nancy','Olivia','Pearl','Sherry','Vera','Wendy'
	],
	boy:[
		'Andy','Bill','Carl','David','Eric','Fred','Harry','Jim','Leo','Mark','Peter','Richard','Steve','Tony','Tim','Vincent','Zack'
	]
}

var DesPool = {
	A:[
		"很善于察言观色",
		"易掩饰自己的真心、无法信任别人",
		"比较默默无闻、喜爱孤独",
		"无论如何也会努力达成目标、耐劳力很强",
		"喜欢遵守约定或规则",
	],
	B:[
		"容易得意忘形、忘乎所以",
		"一旦对事物感兴趣便会刻苦钻研、勤学苦练",
		"性情急躁、反复无常",
		"知识渊博、爱好广泛",
		"对任何人都很开放、喜欢交朋友",
	],
	i:[
		"想法现实、冷静客观",
		"以自我为中心、难以应付的个人行为主义者",
		"充满责任感的保护者",
		"寻求保护的弱势群体",
		"理想主义者、经常逃避现实",
	]
}
var JobPool = [
	{
		job:"律师",
		fit:["M","F","B","i"]
	},
	{
		job:"老师",
		fit:["F","M","B","i"]
	},
	{
		job:"程序员",
		fit:["M","A"]
	},
	{
		job:"公务员",
		fit:["M","F","A","B","i"]
	},
	{
		job:"商人",
		fit:["M","F","B","i"]
	},
	{
		job:"警察",
		fit:["M","A","B","i"]
	},
	{
		job:"军人",
		fit:["M","A","B","i"]
	},
	{
		job:"作家",
		fit:["M","F","A","i"]
	},
	{
		job:"演员",
		fit:["M","F","B","i"]
	},
	{
		job:"导演",
		fit:["M","A","B","i"]
	},
	{
		job:"音乐家",
		fit:["M","A","B","i"]
	},
	{
		job:"司机",
		fit:["M","A"]
	},
	{
		job:"会计",
		fit:["F","A"]
	},
	{
		job:"秘书",
		fit:["F","B","i"]
	},
	{
		job:"教授",
		fit:["M","A","i"]
	},
	{
		job:"科学家",
		fit:["M","A","i"]
	},
	{
		job:"宇航员",
		fit:["M","F","A","B","i"]
	},
	{
		job:"运动员",
		fit:["M","F","B","i"]
	},
	{
		job:"企业家",
		fit:["M","A","B","i"]
	},
	{
		job:"设计师",
		fit:["M","F","A","B"]
	},
	{
		job:"画家",
		fit:["M","F","A","B","i"]
	},
	{
		job:"普通工人",
		fit:["M","A","B"]
	},
	{
		job:"淘宝店主",
		fit:["F","i"]
	},
	{
		job:"自由职业者",
		fit:["M","F","A","B","i"]
	},
	{
		job:"旅行者",
		fit:["M","F","B","i"]
	},
	{
		job:"传教士",
		fit:["M","A","B","i"]
	},
	{
		job:"杂志编辑",
		fit:["M","F","B"]
	},
	{
		job:"企业中层管理",
		fit:["M","F","A","B"]
	},
	{
		job:"天使投资人",
		fit:["M","B","i"]
	},
	{
		job:"创业者",
		fit:["M","B","i"]
	},
	{
		job:"待业青年",
		fit:["M","F","A","B","i"]
	},
	{
		job:"保安",
		fit:["M","A","B"]
	},
	{
		job:"飞行员",
		fit:["M","A","B","i"]
	},
	{
		job:"古董鉴赏者",
		fit:["M","B","i"]
	},
	{
		job:"游戏解说",
		fit:["M","F","B"]
	},
	{
		job:"职业玩家",
		fit:["M","A","i"]
	},
	{
		job:"赛车手",
		fit:["M","A","B","i"]
	},
	{
		job:"情感专家",
		fit:["F","B","i"]
	},
	{
		job:"舞蹈家",
		fit:["M","F","A","B","i"]
	},
	{
		job:"歌手",
		fit:["M","F","A","B","i"]
	},
	{
		job:"厨师",
		fit:["M","F","A","B"]
	},
	{
		job:"品酒大师",
		fit:["M","F","A","B","i"]
	},
	{
		job:"忍者",
		fit:["M","A","B","i"]
	},
	{
		job:"学生",
		fit:["M","F","A","B","i"]
	},
	{
		job:"气功师",
		fit:["M","B","i"]
	},
	{
		job:"社会活动家",
		fit:["M","F","B"]
	},
	{
		job:"政治家",
		fit:["M","F","B"]
	},
	{
		job:"投机者",
		fit:["M","F","B","i"]
	},
	{
		job:"法官",
		fit:["M","A","B"]
	},
	{
		job:"漫画家",
		fit:["M","F","A","B","i"]
	},
	{
		job:"医生",
		fit:["M","F","A","B"]
	},
	{
		job:"救火员",
		fit:["M","A","B"]
	},
	{
		job:"经济学者",
		fit:["M","A","i"]
	},
	{
		job:"发明家",
		fit:["M","F","A","B","i"]
	},
	{
		job:"工业设计师",
		fit:["M","F","A","B"]
	},
	{
		job:"建筑师",
		fit:["M","F","A","B"]
	},
	{
		job:"健身教练",
		fit:["M","A","B","i"]
	},
	{
		job:"世界纪录保持者",
		fit:["M","F","A","B","i"]
	},
	{
		job:"翻译",
		fit:["M","F","A","B"]
	},
	{
		job:"侦探",
		fit:["M","F","A","B","i"]
	},
	{
		job:"海关官员",
		fit:["M","F","A","B"]
	},
	{
		job:"模特",
		fit:["M","F","A","B","i"]
	},
	{
		job:"主持人",
		fit:["M","F","B","i"]
	},
	{
		job:"保姆",
		fit:["F","A","B"]
	},
	{
		job:"幼儿园老师",
		fit:["F","B"]
	},
	{
		job:"地理学家",
		fit:["M","F","A","i"]
	},
	{
		job:"物理学家",
		fit:["M","A","i"]
	},
	{
		job:"化学家",
		fit:["M","F","A","i"]
	},
	{
		job:"数学家",
		fit:["M","A","i"]
	},
	{
		job:"生物学家",
		fit:["M","F","A","i"]
	}
]
/*var CardType = [
	'type1','type2','type3','type4','type5','type6','type7','type8'
]
var Cards = [
	{
		cardid : 1,
		cardname : "暴动",
		carddes : "一个带领了1，2，3",
		cardfunction : "revolution"
	},
	{
		cardid : 2,
		cardname : "工程师的手册",
		carddes : "修复一个机器人",
		cardfunction : "repair"
	},
	{
		cardid : 3,
		cardname : "组装说明书",
		carddes : "手动创造一个机器人",
		cardfunction : "create"
	},
	{
		cardid : 4,
		cardname : "发现流浪的机器人",
		carddes : "随机生成一个机器人",
		cardfunction : "findOne"
	},
	{
		cardid : 5,
		cardname : "机小器的顿悟",
		carddes : "随机属性+-10%",
		cardfunction : "realize"
	},
	{
		cardid : 6,
		cardname : "雷电袭击机小器",
		carddes : "损失一名机小器",
		cardfunction : "lighting"
	},
	{
		cardid : 7,
		cardname : "结婚",
		carddes : "让两名机小器结合",
		cardfunction : "marry"
	},
	{
		cardid : 8,
		cardname : "上帝之手",
		carddes : "多拿一张牌",
		cardfunction : "onemorecard"
	}
	
]
*/
