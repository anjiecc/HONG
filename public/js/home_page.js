$(function(){
	var the_login = $('#the_login');
	var pl_btn = $('.dz_img');
	var pl_DZ = $('.pl_DZ');
	the_login.on('click',function(){
		console.log(123)
	})
//	pl_btn.on('click',function(){
//		console.log(123)
//		console.log($('.pl_DZ span').text())
//	})
	pl_DZ.on('click',function(e){
		var num = Number($(this).find('span').text());
		$(this).find('span').text(num + 1)
		console.log(num + 1)
	})
})