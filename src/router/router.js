export default [
  {
    path: '/',
    name: '_home',
    redirect: '/platformTook/newTook',
    meta: {
      title: '揽件管理',
      icon: ''
    },
    component: () => import('@/components/main.vue'),
    children: [
      {
        path: '/platformTook',
        name: 'platformTook',
        meta: {
          hideInMenu: false,
          title: '平台揽件',
          notCache: true,
          icon: ''
        },
        component: () => import('../views/took-manger/index.vue'),
        children: [
          {
            path: '/platformTook/newTook',
            name: 'newTook',
            meta: {
              hideInMenu: false,
              title: '新建揽件',
              notCache: true,
              icon: ''
            },
            component: () => import('../views/took-manger/new-took.vue')
          },
          {
            path: '/platformTook/tookEnter',
            name: 'tookEnter',
            meta: {
              hideInMenu: false,
              title: '快捷揽件补录',
              notCache: true,
              icon: ''
            },
            component: () => import('../views/took-manger/took-enter.vue')
          }
        ]
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
