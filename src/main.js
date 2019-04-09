import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import * as iView from 'iview';
// import 'iview/dist/styles/iview.css';
import api from './api/baimiApi'
import './theme/index.less';
Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.baimiAPI = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
