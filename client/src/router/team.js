const page = resolve => require(['../module/index'], resolve)
const team = resolve => require(['../module/team/index'], resolve)

export default [{
    path: '/page',
    component: page,
    children: [{
        path: 'team',
        name: 'team',
        component: team,
        meta: {
            title: '团队'
        }
    }]
}]
