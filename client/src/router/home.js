// const page = resolve => require(['../module/index'], resolve)

const home = resolve => require(['../module/home/index'], resolve)
const refuse = resolve => require(['../module/common/refuse'], resolve)
const App = resolve => require(['../App'], resolve)

export default [{
    path: '/page',
    component: App,
    children: [{
        path: 'home',
        name: 'home',
        component: home,
        meta: {
            title: '首页'
        }
    }, {
        path: 'refuse',
        name: 'refuse',
        component: refuse,
        meta: {
            title: '未加入团队'
        }
    }]
}]
