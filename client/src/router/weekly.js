const page = resolve => require(['../module/index'], resolve)
// const weekly = resolve => require(['../module/weekly/index'], resolve)
const weeklyList = resolve => require(['../module/weekly/list'], resolve)
const weeklyDetail = resolve => require(['../module/weekly/add'], resolve)
const weeklyConfig = resolve => require(['../module/weekly/config'], resolve)
export default [{
    path: '/weekly',
    component: page,
    children: [{
        path: 'list',
        component: weeklyList,
        name: 'weeklyList',
        meta: {
            title: '周报'
        }
    }, {
        path: 'detail',
        component: weeklyDetail,
        name: 'weeklyDetail',
        meta: {
            title: '周报详情'
        }
    }, {
        path: 'config',
        component: weeklyConfig,
        name: 'weeklyConfig',
        meta: {
            title: '周报设置'
        }
    }]
}]
