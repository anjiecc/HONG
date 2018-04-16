var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var path = require('path')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'shanpay' })
})
router.get('/index', function(req, res, next) {
    res.render('index.jade', { title: 'shanpay' })
})
/**
 * 上传接口
 */
router.post('/file/upload', function(req, res) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: './static'
    })

    //上传完成后处理
    form.parse(req, (err, fields, files) => {
        var filesTmp = JSON.stringify(files, null, 2)
        if (err) {
            console.log('parse error: ' + err)
        } else {
            console.log('parse files: ' + filesTmp)
            var file = files.file[0]

            var uploadedPath = file.path

            var dstPath = './static/' + file.originalFilename

            var headers = file.headers

            var size = file.size
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, err => {
                if (err) {
                    console.log('rename error: ' + err)
                    res.send({
                        type: false,
                        msg: err
                    })
                } else {
                    console.log('rename ok')
                    res.send({
                        type: true,
                        url: uploadedPath,
                        originalUrl: dstPath,
                        headers: headers,
                        size: size,
                        msg: 'upload success'
                    })
                }
            })
        }
    })
})
/**
 * 下载文件
 */
router.get('/file/download', function(req, res) {
    // var request = require('request')
    // request('http://n.sinaimg.cn/news/transform/20170211/F57R-fyamvns4810245.jpg').pipe(
    //     fs.createWriteStream('doodle.png')
    // )
    var currDir = path.normalize('upload'),
        fileName = req.query.name || 'logo.png',
        currFile = path.join(currDir, fileName),
        fReadStream

    fs.exists(currFile, function(exist) {
        if (exist) {
            res.set({
                'Content-type': 'application/octet-stream',
                'Content-Disposition': 'attachment;filename=' + encodeURI(fileName)
            })
            fReadStream = fs.createReadStream(currFile)
            fReadStream.on('data', chunk => res.write(chunk, 'binary'))
            fReadStream.on('end', function() {
                res.end()
            })
        } else {
            res.set('Content-type', 'text/html')
            res.send('file not exist!')
            res.end()
        }
    })
})
module.exports = router
