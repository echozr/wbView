/**
 * @description 用户的全局数据存储
 * @author zr
 */
export default {
  state: {
    isLogin: false,
    userInfo: {},
    currentUserInfo: {}
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
    },
    currentUser: (state, data) => {
      state.currentUserInfo = data
    }
  },
  actions: {
    // 登录
    setLogin: ({ commit }, data) => {
      localStorage.setItem('isLogin', data.flag)
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
      commit('Login', data)
    },
    // 退出
    setLogout: ({ commit }, data) => {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('userInfo')
      commit('Logout')
    },
    // 获取当前用户信息
    setCurrentUser: ({ commit }, data) => {
      commit('currentUser', data)
    }
  }
}
