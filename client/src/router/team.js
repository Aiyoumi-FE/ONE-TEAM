const page = resolve => require(['../module/index'], resolve)
// const team = resolve => require(['../module/team/index'], resolve)
const teamList = resolve => require(['../module/team/list'], resolve)
const teamJoin = resolve => require(['../module/team/join'], resolve)
const teamTree = resolve => require(['../module/team/tree'], resolve)

export default [{
    path: '/page/team',
    component: page,
    children: [{
        path: 'list',
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
    }]
}]
