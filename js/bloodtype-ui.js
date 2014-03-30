
$(function() {
	$( ".avatar_dom" ).draggable({ scroll: true });
	$('.dialog').position({my:"center top+25%",of:"body"}).draggable();
	
	
	
	
	$("#next_year").click(function(){
		for(var i in AvatarPool){
			AvatarPool[i].older();
		}
		var newyear = Number($('#year').html()) + 1;
		console.log(newyear)
		$('#year').html(newyear);
	})
	
	$('.dialog .close').click(function(){
		$(this).parent('.dialog').hide();
	})
	/*
	
	var cards = new Cards(5);
	
	
	cards.putCards();
	*/
});