export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    meta: {
      title: '首页',
      icon: ''
    },
    component: () => import('@/components/main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: ''
        },
        component: () => import('@/views/express-manger/express-query.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
