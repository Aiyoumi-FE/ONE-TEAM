import home from './router/home'
import user from './router/user'
import weekly from './router/weekly'
import team from './router/team'

// const page = resolve => require(['./module/index'], resolve)
// const test = resolve => require(['./module/test'], resolve)
// const testRouter = [{
//     path: '/page',
//     component: page,
//     children: [{
//         path: 'test',
//         name: 'test',
//         component: test,
//         meta: {
//             title: '测试'
//         }
//     }]
// }]
export default [
    ...home,
    ...user,
    ...weekly,
    ...team
]
