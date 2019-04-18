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
          hideInMenu: false,
          title: '运行概况',
          notCache: true,
          icon: ''
        },
        component: () => import('../views/Home.vue')
      }]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/partner/config',
    meta: {
      title: '加盟合伙制',
      icon: ''
    },
    component: () => import('@/components/main.vue'),
    children: [
      {
        path: '/partner/config',
        name: 'partnerConfig',
        meta: {
          hideInMenu: false,
          title: '加盟网点收费配置',
          notCache: true,
          icon: ''
        },
        component: () => import('../views/partner/config.vue')
      },
      { path: '/partner/configRecord',
        name: 'partnerConfigRecord',
        meta: {
          hideInMenu: false,
          title: '配置修改记录',
          notCache: true,
          icon: ''
        },
        component: () => import('../views/partner/configRecord.vue')
      },
      { path: '/partner/dailyReport',
        name: 'partnerDailyReport',
        meta: {
          hideInMenu: false,
          title: '营业概览',
          notCache: true,
          icon: ''
        },
        component: () => import('../views/partner/dailyReport.vue')
      }
      ]
  },
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
