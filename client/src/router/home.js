const page = resolve => require(['../module/index'], resolve)
const home = resolve => require(['../module/home/index'], resolve)

export default [{
    path: '/page',
    component: page,
    children: [{
        path: 'home',
        name: 'home',
        component: home,
        meta: {
            title: '首页'
        }
    }]
}]
