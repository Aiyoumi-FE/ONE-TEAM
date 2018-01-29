// const page = resolve => require(['../module/index'], resolve)
const user = resolve => require(['../module/user/login/index'], resolve)
const login = resolve => require(['../module/user/login/login'], resolve)
const register = resolve => require(['../module/user/login/register'], resolve)
const settings = resolve => require(['../module/user/settings/index'], resolve)
const App = resolve => require(['../App'], resolve)

export default [
    {
        path: '/',
        redirect: '/page/home'
    },
    {
        path: '/page',
        component: App,
        children: [{
            path: 'user',
            component: user,
            children: [{
                path: 'login',
                name: 'login',
                component: login,
                meta: {
                    title: '登录'
                }
            }, {
                path: 'register',
                name: 'register',
                component: register,
                meta: {
                    title: '注册'
                }
            }]
        }, {
            path: 'user/settings',
            name: 'settings',
            component: settings,
            meta: {
                title: '个人设置'
            }
        }]
    }
]
