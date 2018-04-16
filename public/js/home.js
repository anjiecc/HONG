$(function() {
//	var phone = $('#my_num');
//	var pass = $('#my_pass');
//	var phone_val = '';
//	var pass_val = '';
//	var btn = $('#landing_btn'); //点击登陆
//	var phoneReg = /^(((13|14|15|18|17)\d{9}))$/;
//	var lan_obj = {
//		phone_obj: false,
//		pass_obj: false
//	}
//
//	//	输入账号
//	phone.bind('input propertychange', function() {
//		phone_val = phone.val();
//		if(phoneReg.test(phone_val)) {
//			lan_obj.phone_obj = true;
//		}
//		console.log(phone_val);
//	});
//	//	输入密码
//	pass.bind('input propertychange', function() {
//		pass_val = pass.val();
//		if(pass_val != '') {
//			lan_obj.pass_obj = true;
//		}
//		console.log(pass_val);
//	});
//	btn.on('click', function() {
//		console.log(lan_obj);
//		var count = 0;
//		for(var i in lan_obj) {
//			if(lan_obj[i]) {
//				count++;
//			}
//		}
//		if(Object.keys(lan_obj).length === count) {
//			alert('发送ajax')
//			$.ajax({
//				type: "get",
//				url: "",
//				data: {
//					phone: phone_val,
//					pass: pass_val
//				},
//				success: function(data) {
//
//				}
//			});
//
//		}
//
//	})





})