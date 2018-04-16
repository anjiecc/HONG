$(function() {
	var phone_M = $('#phone');
	var code_M = $('#code');
	var pass_M = $('#pass');
	var pass2_M = $('#pass2');
	var phone_M_val = '';
	var code_M_val = '';
	var pass_M_val = '';
	var pass2_M_val = '';
	var phone_MReg = /^(((13|14|15|18|17)\d{9}))$/;
	var CodeReg = /^[0-9]{6}$/;
	var code_click = $('#code_click');
	var btn = $('#btn');
	var reg_obj = {
		phone_obj: false,
		code_obj: false,
		pass_obj: false,
		pass2_obj: false
	}

	//获取验证码倒计时按钮
	code_click.on('click', function() {
		phone_M_val = phone_M.val();
		console.log(code_click.text())
		if(phone_MReg.test(phone_M_val)) {
			var my_code_text = code_click.text(45 + 's后重新获取'); //按钮中的文本
			var setTime; //时间
			var time = parseInt(my_code_text.text());
			setTime = setInterval(function() {
				if(time <= 0) {
					clearInterval(setTime);
					my_code_text.text('获取验证码');
					return;
				}
				time--;
				my_code_text.text(time + 's后重新获取');
			}, 1000);
			reg_obj.phone_obj = true;
			code_M.removeAttr('readonly');

			$.ajax({
				url: '',
				type: 'get',
				data: {
					phone: phone_M_val
				}
			})
		} else {
			alert('请输入手机号码！')
		}
	});
	//	输入验证码val
	code_M.bind('input propertychange', function() {
		code_M_val = code_M.val();
		if(CodeReg.test(code_M_val)) {
			reg_obj.code_obj = true;
		}
	});
	//	输入密码
	pass_M.bind('input propertychange', function() {
		pass_M_val = pass_M.val();
		if(pass_M_val != '') {
			reg_obj.pass_obj = true;
		}
	});
	//	再次输入密码
	pass2_M.bind('input propertychange', function() {
		pass2_M_val = pass2_M.val();
		if(pass2_M_val === pass_M_val) {
			reg_obj.pass2_obj = true;
		}
	});

	//	提交按钮
	btn.on('click', function() {
		console.log(reg_obj)
		var count = 0;
		for(var i in reg_obj) {
			if(reg_obj[i]) {
				count++;
			}
		}
		if(Object.keys(reg_obj).length === count) {
			$.ajax({
				type: "get",
				url: "",
				data: {
					phone: phone_M_val,
					code: code_M_val,
					pass:pass_M_val,
					pass2:pass2_M_val
				},
				success: function(data) {

				}
			});

		}
	})
})