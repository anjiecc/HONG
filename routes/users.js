var express = require('express')
var router = express.Router()
var service = require('../api/apiService')
var nodemailer = require('nodemailer')
var config = require('../config/config')
//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function guid() {
    return S4() + S4() + S4() + S4()
}
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource')
})
/**
 * 登录
 */
router.post('/login', function(req, res) {
    var userName = req.body.userName

    var passWord = req.body.passWord

    var array = [userName, passWord]

    service.login(array, function(data) {
        if (data) {
            console.log('登录成功!')
            res.send({ success: data, data: userName })
        } else {
            console.log('登录失败!')
            res.send({ success: data, data: '' })
        }
    })
})
/**
 * 注册
 */
router.get('/registered', function(req, res) {
    var userName = req.query.userName
    var passWord = req.query.passWord
    var id = guid()
    var array = [userName, id, passWord]
    service.register(array, function(data) {
        res.send(data)
    })
})
/**
 * 校验用户名是否重复
 */
router.get('/checkUserName', function(req, res) {
    var userName = req.query.userName
    service.checkUserName([userName], function(data) {
        res.send({
            success: data.success,
            data: {}
        })
    })
})
/**
 * 发生邮件验证
 */
router.get('/sendMail', function(req, res) {
    let transporter = nodemailer.createTransport({
        // host: 'smtp.163.com',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        //port: 465, // SMTP 端口
        // secureConnection: true, // 使用了 SSL
        auth: {
            user: config.mailConfig.user,
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: config.mailConfig.passWord
        }
    })
    // 生成4位验证码
    let code = Math.floor(Math.random() * 9000) + 1000
    let mailOptions = {
        from: 'HONG<' + config.mailConfig.user + '>', // sender address
        to: 'chenanjievip@163.com', // list of receivers
        subject: config.mailConfig.subject, // Subject line
        cc: config.mailConfig.user,
        // 发送text或者html格式
        //text: 'Hello world?' // plain text body
        html: config.mailConfig.content(code)
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
            res.send({
                success: false,
                msg: error
            })
        }
        console.log('Message sent: %s', info.messageId)
        console.log('Message send success')
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
        res.send({
            success: true,
            msg: info.messageId
        })
    })
})
module.exports = router
