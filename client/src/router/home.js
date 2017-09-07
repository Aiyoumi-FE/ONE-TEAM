const App = resolve => require(['../App'], resolve)
const home = resolve => require(['../module/home/index'], resolve)
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
  }]
}, {
  path: '/',
  component: App,
  name: 'index',
  meta: {
    title: 'index'
  }
}]
