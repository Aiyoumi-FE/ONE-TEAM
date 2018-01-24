import koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import session from 'koa-session';
import serve from 'koa-static';
import config from './configs';
const app = new koa();
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const controller = require('./controller');

const { businessUtil } = require('./util')

app.use(bodyParser());
// 静态文件的路径
app.use(serve('./client/dist'));

app.use(async(ctx, next) => {
    // 用户登录拦截
    let reg = /login|register/
    if (reg.test(ctx.request.url) || businessUtil.getStatus(ctx)) {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    } else {
        let result = {
            code: '-1999',
            resultRes: '用户未登录',
            success: false
        }
        ctx.response.body = result
    }
})

// 接口操作
app.use(controller('api'));

app.on('error', function(err, ctx) {
    console.log(err);
});


// var _ = require('koa-route');
// const upload = multer({ dest: './' }).single('file');

// var formidable = require('formidable');

// app.use(_.post('/uploadFile111', function(req, res) {
//     var form = new formidable.IncomingForm();
//     form.parse(req.req, function(err, fields, files) {
//         console.log('======');
//         var oldpath = files.filetoupload.path;
//         var newpath = './' + files.filetoupload.name;
//         console.log(oldpath, newpath);
//         //fs.copyFile(oldpath, newpath);
//         console.log('-------');
//         fs.rename(oldpath, newpath, function(err) {
//             if (err) throw err;
//             res.write('File uploaded and moved!');
//             res.end();
//         });

//         res.write('File uploaded');
//         res.end();
//     });

//     let result = {
//         result: {
//             filename: ''
//         },
//         success: true
//     }
//     req.body = result;
// }));

app.listen(config.dev.port, () => {
    console.log('The server is running at http://localhost:' + config.dev.port)
});
