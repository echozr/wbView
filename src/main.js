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
// 路由守卫
store.state.user.isLogin = localStorage.getItem('isLogin') // 获取本地存储的token
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (store.state.user.isLogin) { // 通过vuex state获取当前的token是否存
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
