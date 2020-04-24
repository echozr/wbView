import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
import './utils/validator'
import tools from './utils/tools'
import 'amfe-flexible'
Vue.prototype.$axios = api // 将api挂载到vue的原型上
Vue.prototype.$tools = tools
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
