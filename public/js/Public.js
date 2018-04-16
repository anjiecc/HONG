$(function() {
    var zz = $('#zz')
    var a_l = $('#a_l') //登陆
    var a_r = $('#a_r') //注册
    var login_no = $('.login_no') //登录状态
    var information = $('#information') //信息栏
    var login_no_jt = $('#login_no_jt') //图片箭头
    var header_ul_li2 = $('.header_ul_li2') //移入的父亲
    var gb_xx = $('#gb_xx') //关闭登陆弹窗按钮
    var landing = $('#landing') //登陆弹窗
    var phone = $('#my_num')
    var pass = $('#my_pass')
    var phone_val = ''
    var pass_val = ''
    var btn = $('#landing_btn') //登陆提交
    var phoneReg = /^(((13|14|15|18|17)\d{9}))$/
    var lan_obj = {
        phone_obj: false,
        pass_obj: false
    }
    //	注册弹框内容
    var regihh = $('#regihh')
    var gb2_xx = $('#gb2_xx')
    var my_num2 = $('#my_num2')
    var my_code = $('#my_code')
    var code_my_btn = $('#code_my_btn')
    var my_pass2 = $('#my_pass2')
    var regihh_p = $('#regihh_p')
    var dxCodeReg = /^[0-9]{6}$/
    var my_num2_val = ''
    var my_code_val = ''
    var my_pass2_val = ''
    var regihh_btn = $('#regihh_btn') //注册提交
    var zhuC_obj = {
        my_num2_obj: false,
        my_code_obj: false,
        my_pass2_obj: false
    }

    login_no.on('mouseenter', function() {
        login_no_jt.attr('src', 'img/jt_t.png')
        information.show()
    })

    login_no.on('mouseleave', function() {
        information.hide()
        login_no_jt.attr('src', 'img/jt_b.png')
    })
    header_ul_li2.on('mouseenter', 'div', function(e) {
        var checked = $(this).attr('isChecked')
        if (checked === 'false' || !checked) {
            $(this)
                .find('a')
                .css({
                    color: '#89bcc2'
                })
        }
    })
    header_ul_li2.on('mouseleave', 'div', function(e) {
        var checked = $(this).attr('isChecked')
        if (checked === 'false' || !checked) {
            $(this)
                .find('a')
                .css({
                    color: '#000'
                })
        }
    })
    header_ul_li2.on('click', 'div', function(e) {
        $('.header_ul_li2_div')
            .attr('isChecked', false)
            .css({
                background: '#fff'
            })
            .find('a')
            .css({
                color: '#000'
            })
        $(e.currentTarget)
            .css({
                background: '#89bcc2'
            })
            .find('a')
            .css({
                color: '#fff'
            })
        $(this).attr('isChecked', 'true')
    })
    //登陆按钮
    a_l.on('click', function() {
        landing.show()
        zz.show()
    })
    //注册按钮
    a_r.on('click', function() {
        regihh.show()
        zz.show()
    })
    //关闭登陆弹窗按钮
    gb_xx.on('click', function() {
        landing.hide()
        zz.hide()
    })
    //关闭注册弹窗按钮
    gb2_xx.on('click', function() {
        regihh.hide()
        zz.hide()
    })
    //	输入账号
    phone.bind('input propertychange', function() {
        phone_val = phone.val()
        if (phoneReg.test(phone_val)) {
            lan_obj.phone_obj = true
        }
        console.log(phone_val)
    })
    //	输入密码
    pass.bind('input propertychange', function() {
        pass_val = pass.val()
        if (pass_val != '') {
            lan_obj.pass_obj = true
        }
        console.log(pass_val)
    })
    $('#userNameno').on('click', function() {
        $('#userName').html('')
        $('.login_yes').show()
        $('#userNameno').hide()
        // landing.show()
        // regihh.show()
        // zz.hide()
    })
    btn.on('click', function() {
        var userName = $('#my_num').val() // 用户名
        var passWord = $('#my_pass').val() // 密码
        var landing = $('#landing')
        var regihh = $('#regihh')
        $.ajax({
            url: '/users/login',
            type: 'post',
            data: {
                userName: userName,
                passWord: passWord
            },
            success: function(data) {
                console.log(data)
                if (data.data) {
                    $('#userName').html(data.data)
                    $('#userNameno').show()
                    $('#recharge').show()
                    $('.login_yes').hide()
                    landing.hide()
                    regihh.hide()
                    zz.hide()
                } else {
                    $('#userName').html('')
                    $('.login_yes').show()
                    $('#recharge').hide()
                    $('#userNameno').hide()
                    landing.show()
                    regihh.show()
                    zz.hide()
                }
            }
        })
        // console.log(lan_obj);
        // var count = 0;
        // for(var i in lan_obj) {
        // 	if(lan_obj[i]) {
        // 		count++;
        // 	}
        // }
        // if(Object.keys(lan_obj).length === count) {
        // 	alert('发送ajax')
        // 	$.ajax({
        // 		type: "get",
        // 		url: "",
        // 		data: {
        // 			phone: phone_val,
        // 			pass: pass_val
        // 		},
        // 		success: function(data) {

        // 		}
        // 	});

        // }
    })

    //	注册按钮事件
    //获取验证码倒计时按钮
    code_my_btn.on('click', function() {
        my_num2_val = my_num2.val()
        if (phoneReg.test(my_num2_val)) {
            var my_code_text = code_my_btn.text(45 + 's后重新获取') //按钮中的文本
            var setTime //时间
            var time = parseInt(my_code_text.text())
            setTime = setInterval(function() {
                if (time <= 0) {
                    clearInterval(setTime)
                    code_my_btn.text('获取验证码')
                    return
                }
                time--
                my_code_text.text(time + 's后重新获取')
            }, 1000)
            zhuC_obj.my_num2_obj = true
            my_code.removeAttr('readonly')
            $.ajax({
                url: '',
                type: 'get',
                data: {
                    phone: my_num2_val
                }
            })
        } else {
            alert('请接收验证码！')
        }
    })
    //	输入验证码
    my_code.bind('input propertychange', function() {
        my_code_val = my_code.val()
        if (dxCodeReg.test(my_code_val)) {
            zhuC_obj.my_code_obj = true
        }
    })
    // 密码
    my_pass2.bind('input propertychange', function() {
        my_pass2_val = my_pass2.val()
        if (my_pass2_val != '') {
            zhuC_obj.my_pass2_obj = true
        }
    })
    //	注册
    regihh_btn.on('click', function() {
        var userName = my_num2.val()
        var passWord = my_pass2.val()
        $.ajax({
            url: '/users/registered?userName=' + userName + '&passWord=' + passWord,
            type: 'get',
            success: function(data) {
                if (data.success) {
                    alert('注册成功!')
                } else {
                    alert('注册失败!')
                }
            }
        })
        // var count = 0
        // for (var i in zhuC_obj) {
        //     if (zhuC_obj[i]) {
        //         count++
        //     }
        // }
        // if (Object.keys(zhuC_obj).length === count) {
        //     console.log('注册ajax')
        //     $.ajax({
        //         type: 'get',
        //         url: '',
        //         data: {
        //             phone: my_num2_val,
        //             code: my_code_val,
        //             pass: my_pass2_val
        //         },
        //         success: function(data) {}
        //     })
        // }
    })
    $('#xiaz').on('click', function() {
        $('body').append(
            $('<iframe/>')
                .attr('src', '/file/download')
                .css('display', 'none')
        )
    })
})
