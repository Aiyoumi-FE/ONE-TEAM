// const fs = require('fs');
import fs from 'fs'

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        if (f !== 'user.js') {
            addMapping(router, mapping);
        }
    });
}

// function addUploadFile(router) {
//     //文件上传
//     const multer = require('koa-multer');
//     //配置
//     var storage = multer.diskStorage({
//         //文件保存路径
//         destination: function(req, file, cb) {
//             console.log('----=======');
//             cb(null, __dirname + '/static/')
//         },
//         filename: function(req, file, cb) {
//             console.log('32323');
//             // console.log(arguments);
//             var fileFormat = (file.originalname).split(".");
//             cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//         }
//     })

//     var upload = multer({ storage: storage });
//     //upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/>
//     router.post('/uploadFile', upload.single('file'), async(ctx, next) => {
//         console.log(ctx)
//         let result = {
//             result: {
//                 filename: ctx
//             },
//             success: true
//         }
//         ctx.response.body = result;
//         /*ctx.body = {
//                 filename: ctx.req.file.filename//返回文件名
//         }*/
//         // ctx.redirect('/index');
//     })

//     console.log(`register URL mapping: POST /uploadFile`);
// }

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();

    addControllers(router, controllers_dir);
    // addUploadFile(router);
    return router;
};
