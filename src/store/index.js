import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块
import user from './Module/user'
import blog from './Module/blog'
import follow from './Module/follow'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    blog,
    follow
  }
})
