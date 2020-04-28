/**
 * @description 用户的全局数据存储
 * @author zr
 */
export default {
  state: {
    isLogin: false,
    userInfo: {}
  },
  getter: {
  },
  mutations: {
    Login: (state, data) => {
      state.isLogin = data.flag
      state.userInfo = data.userInfo
    },
    Logout: (state) => {
      state.isLogin = false
      state.userInfo = ''
    }

  },
  actions: {
    // 登录
    setLogin: ({ commit }, data) => {
      localStorage.setItem('isLogin', data.flag)
      commit('Login', data)
    },
    // 退出
    setLogout: ({ commit }, data) => {
      localStorage.removeItem('isLogin')
      commit('Logout')
    }
  }
}
