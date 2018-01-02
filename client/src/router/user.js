// const page = resolve => require(['../module/index'], resolve)
const login = resolve => require(['../module/user/login/index'], resolve)
const App = resolve => require(['../App'], resolve)

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'login',
        name: 'login',
        component: login,
        meta: {
            title: 'welcome'
        }
    }]
}]
