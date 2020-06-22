import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
import './utils/validator'
import tools from './utils/tools'
import 'amfe-flexible'
import vFilter from './utils/vfilters' // 全局过滤方法
import divider from './components/common/divider'
import zrLoading from './components/common/loading'
Vue.prototype.$axios = api // 将api挂载到vue的原型上
Vue.prototype.$tools = tools
Vue.config.productionTip = false
// 引入全局组件
Vue.component('divider', divider)
// 引入全局加载动画
Vue.component('zrLoading', zrLoading)
// 路由守卫
store.state.user.isLogin = localStorage.getItem('isLogin') // 获取本地存储的token
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (store.state.user.isLogin) { // 通过vuex state获取当前的token是否存
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

// 全局过滤器注册
Object.keys(vFilter).forEach(key => {
  Vue.filter(key, vFilter[key])
})

router.afterEach(route => {
  window.scroll(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
