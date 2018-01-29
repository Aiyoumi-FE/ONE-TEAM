import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import configRouter from './routes'
import Axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import { cookie } from '@/assets/js/cookie'

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
    const token = cookie.get('token')
    document.title = to.meta.title || 'one team'

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
