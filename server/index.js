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

app.use(async(ctx, next) => {
    // 用户登录拦截
    let reg = /login|register/
    // console.log(ctx.request.url)
    // console.log(reg.test(ctx.request.url))
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

// app.keys = ['1'];
// const CONFIG = {
//   key: 'SESSIONID',
//   /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   overwrite: true,
//   * (boolean) can overwrite or not (default true)
//   httpOnly: true,
//   /** (boolean) httpOnly or not (default true) */
//   signed: true,
//   /** (boolean) signed or not (default true) */
//   rolling: false,
//   /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
// };

app.use(bodyParser());
// 静态文件的路径
app.use(serve('./client/dist'));
// app.use(session(CONFIG, app));
// 接口操作
app.use(controller('api'));
// response
// app.use(ctx => {
//   ctx.response.type = 'html';
//   console.log(__dirname)
//   ctx.response.body = fs.createReadStream(path.join(__dirname, '..', '/client/index.html'));
// });
//

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
