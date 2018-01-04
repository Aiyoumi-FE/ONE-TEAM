// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import configRouter from './routes'
import './assets/js/ajax'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: configRouter,
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'one team'
    next()
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

// new Vue({
//     el: '#app',
//     router,
//     render: h => h(App)
// })
