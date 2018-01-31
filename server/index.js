import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import config from './configs'
import { businessUtil, constStr } from './util'

const app = new Koa()
const router = require('koa-router')()
const jwt = require('koa-jwt')
const route = require('./routes/route')
const userRoutes = require('./routes/user')

const { secret } = constStr

app.use(bodyParser())

// 静态文件的路径
app.use(serve('./client/dist'))

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
router.use(userRoutes.routes())
router.use('/api', jwt({ secret }), route().routes())
app.use(router.routes())

app.on('error', function(err, ctx) {
    console.log(err)
})

app.listen(config.dev.port, () => {
    console.log('The server is running at http://localhost:' + config.dev.port)
})
