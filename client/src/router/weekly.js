const App = resolve => require(['../App'], resolve)
const weekly = resolve => require(['../module/weekly/index'], resolve)
const weeklyList = resolve => require(['../module/weekly/list'], resolve)
const weeklyDetail = resolve => require(['../module/weekly/add'], resolve)
export default [{
  path: '/page',
  component: App,
  children: [{
    path: 'weekly',
    component: weekly,
    children: [{
      path: 'list',
      component: weeklyList,
      name: 'weeklyList',
      meta: {
        title: 'weeklyList'
      }
    }, {
      path: 'detail',
      component: weeklyDetail,
      name: 'weeklyDetail',
      meta: {
        title: 'weeklyDetail'
      }
    }]
  }]
}]
