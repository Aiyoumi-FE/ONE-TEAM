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

app.on('error', function(err, ctx) {
    console.log(err);
});

app.listen(config.dev.port, () => {
    console.log('The server is running at http://localhost:' + config.dev.port)
});
