const page = resolve => require(['../module/index'], resolve)
// const team = resolve => require(['../module/team/index'], resolve)
const teamList = resolve => require(['../module/team/list'], resolve)
const teamJoin = resolve => require(['../module/team/join'], resolve)
const teamTree = resolve => require(['../module/team/tree'], resolve)
const teamDashBoard = resolve => require(['../module/team/dashboard'], resolve)
const mysub = resolve => require(['../module/team/subscription'], resolve)

export default [{
    path: '/page',
    component: page,
    children: [{
        path: 'teamList',
        component: teamList,
        name: 'teamList',
        meta: {
            title: '团队成员'
        }
    }, {
        path: 'teamManage',
        component: teamTree,
        name: 'teamTree',
        meta: {
            title: 'teamTree',
            inDefault: true,
            throwContent: true
        }
    }, {
        path: 'teamJoin',
        component: teamJoin,
        name: 'teamJoin',
        meta: {
            title: '添加成员'
        }
    }, {
        path: 'teamDashBoard',
        component: teamDashBoard,
        name: 'teamDashBoard',
        meta: {
            title: '主管面板'
        }
    }, {
        path: 'mysub',
        component: mysub,
        name: 'mysub',
        meta: {
            title: '我的关注'
        }
    }]
}]
