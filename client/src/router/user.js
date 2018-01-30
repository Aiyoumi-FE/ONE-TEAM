// const page = resolve => require(['../module/index'], resolve)
const user = resolve => require(['../module/user/login/index'], resolve)
const login = resolve => require(['../module/user/login/login'], resolve)
const register = resolve => require(['../module/user/login/register'], resolve)
const settings = resolve => require(['../module/user/settings/index'], resolve)
const App = resolve => require(['../module/index'], resolve)

export default [{
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
                title: '登录',
                throwContent: true,
                throwHeader: true
            }
        }, {
            path: 'register',
            name: 'register',
            component: register,
            meta: {
                title: '注册',
                throwContent: true,
                throwHeader: true
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
}]
