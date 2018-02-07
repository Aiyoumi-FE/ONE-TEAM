import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import configRouter from './routes'
import Axios from 'axios'
import jwt from 'jsonwebtoken'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import { cookie } from '@/assets/js/cookie'
import {
    Input,
    Button,
    Alert,
    Row,
    Col,
    MessageBox,
    Message,
    Dialog,
    Form,
    FormItem,
    Loading
} from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.config.productionTip = false
Axios.defaults.withCredentials = true
Vue.use(VueRouter)
Vue.prototype.$http = Axios

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: configRouter,
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'one team'

    let token = cookie.get('token')
    const secret = 'jwt one'
    let decoded = null

    if (token) {
        decoded = jwt.verify(token, secret, function(err, decoded) {
            return err || decoded
        })
    }

    if (decoded) {
        if (decoded.exp - Date.now() < 0) { // 已过期
            cookie.clear('token', '/')
            cookie.clear('name', '/')
        } else {
            decoded.exp = Date.now() + 60 * 60 * 1000
            token = jwt.sign(decoded, secret)
            cookie.set('token', token, decoded.exp, '/')
        }
    }

    if (to.path === '/') {
        if (token) {
            next('/page/home')
        } else {
            next('/page/user/login')
        }
    } else {
        if (token) {
            Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }

        next()
    }
})

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
