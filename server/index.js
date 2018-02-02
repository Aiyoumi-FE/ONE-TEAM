import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import config from './configs'
import { businessUtil, constStr } from './util'
import koaRouter from 'koa-router'
import jwt from 'koa-jwt'
import route from './routes/route'
import userRoutes from './routes/user'

const app = new Koa()
const router = koaRouter()
const { secret } = constStr

app.use(bodyParser())

// 静态文件的路径
app.use(serve('./client/dist'))

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
