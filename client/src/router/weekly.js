const page = resolve => require(['../module/index'], resolve)
// const weekly = resolve => require(['../module/weekly/index'], resolve)
const weeklyList = resolve => require(['../module/weekly/list'], resolve)
const weeklyDetail = resolve => require(['../module/weekly/add'], resolve)
const weeklyConfig = resolve => require(['../module/weekly/config'], resolve)
export default [{
    path: '/page',
    component: page,
    children: [{
        path: 'weeklyList',
        component: weeklyList,
        name: 'weeklyList',
        meta: {
            title: '周报'
        }
    }, {
        path: 'weeklyDetail',
        component: weeklyDetail,
        name: 'weeklyDetail',
        meta: {
            title: '周报详情'
        }
    }, {
        path: 'weeklyConfig',
        component: weeklyConfig,
        name: 'weeklyConfig',
        meta: {
            title: '周报设置'
        }
    }]
}]
