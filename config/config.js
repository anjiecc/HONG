/**
 * Created by Administrator on 2017/8/8.
 */
const config = {
    //商户号（6位数字）
    user_seller: '74242483',

    //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    //合作身份者PID，签约账号，由16位纯数字组成的字符串，请登录商户后台查看
    partner: '1122781913193591',

    // MD5密钥，安全检验码，由数字和字母组成的32位字符串，请登录商户后台查看
    key: 'e9ebb566168042cc8ad454e6c1d4f9d2',

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    notify_url: 'http://127.0.0.1:3000/pay/notify_url',

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    return_url: 'http://127.0.0.1:3000/pay/return_url',

    // 订单提交地址
    post_url: 'http://payment.passpay.net/PayOrder/payorder',

    // 发送邮箱配置文件
    mailConfig: {
        user: '604526279@qq.com',
        passWord: 'mejriqtlepbybbdb',
        subject: '重置密码',
        content: function(code) {
            return (
                '[HONG] 验证码：<a href="javascript:viod 0">' +
                code +
                '</a>,请输入验证码进行密码重置[验证码告知他人将导致账号被盗，请勿泄漏]'
            )
        }
    }
}

module.exports = config
