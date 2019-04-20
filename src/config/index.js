export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'iView-admin',

  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: '_home',

  menuList: [{
    title: '加盟合伙制',
    name: 'partner',
    children: [
      {title: '加盟网点收费配置', name: 'partnerConfig'},
      {title: '配置修改记录', name: 'partnerConfigRecord'},
      {title: '营业概览', name: 'partnerDailyReport'},
      {title: '账单明细', name: 'partnerBill'},
      {title: '财务报表', name: 'partnerReport'},
    ]
  }, {
    title: '揽件管理',
    name: '_home',
    children: [
      {title: '平台揽件', name: 'platformTook', children: [{title: '新建揽件', name: 'newTook'},
          {title: '快捷揽件补录', name: 'tookEnter'},
          {title: '揽件未支付', name: 'tookUnPay'},
          {title: '揽件查询', name: 'tookQuery'}]},
      {title: '快递接件', name: '2'},
      {title: '快递员工派件', name: '3'}
    ]
  }]

}
