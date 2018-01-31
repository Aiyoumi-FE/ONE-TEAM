import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'

const router = koaRouter()

// add url-route in /controllers:
function addMapping(router, mapping) {
    let pathUrl = ''

    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            pathUrl = url.substring(4)
            router.get(pathUrl, mapping[url])
            console.log(`register URL mapping: GET ${pathUrl}`)
        } else if (url.startsWith('POST ')) {
            pathUrl = url.substring(5)
            router.post(pathUrl, mapping[url])
            console.log(`register URL mapping: POST ${pathUrl}`)
        } else if (url.startsWith('PUT ')) {
            pathUrl = url.substring(4)
            router.put(pathUrl, mapping[url])
            console.log(`register URL mapping: PUT ${pathUrl}`)
        } else if (url.startsWith('DELETE ')) {
            pathUrl = url.substring(7)
            router.del(pathUrl, mapping[url])
            console.log(`register URL mapping: DELETE ${pathUrl}`)
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

function addControllers(router) {
    fs.readdirSync(__dirname).filter((f) => {
        return f.endsWith('.js')
    }).forEach((file) => {
        console.log(`process controller: ${file}...`)
        let mapping = require(path.join(__dirname, file))
        if (file !== 'user.js') {
            addMapping(router, mapping)
        }
    })
}

function addUploadFile(router) {
    // 文件上传
    const multer = require('koa-multer')
    // 配置
    var storage = multer.diskStorage({
        // 文件保存路径
        destination: function(req, file, cb) {
            console.log('----=======')
            cb(null, path.join(__dirname, 'static'))
        },
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split('.')
            cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
        }
    })

    var upload = multer({ storage: storage })

    // upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/>
    router.post('/uploadFile', upload.single('file'), async(ctx, next) => {
        console.log(ctx)
        let result = {
            result: {
                filename: ctx
            },
            success: true
        }

        ctx.response.body = result
    })

    console.log(`register URL mapping: POST /uploadFile`)
}

module.exports = function() {
    addControllers(router)
    addUploadFile(router)
    return router
}
