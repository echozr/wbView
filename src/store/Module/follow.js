/**
 * @description 关注相关的全局数据
 * @author zr
 */
export default {
  state: {
    fansList: [],
    followList: []
  },
  getter: {
  },
  mutations: {
    // 获取粉丝列表
    setFans: (state, data) => {
      const arr = data.map(v => {
        const Follow = state.followList.filter(i => {
          return i.id === v.id
        })
        const isFollow = Follow.length > 0
        v.isFollow = isFollow
        return v
      })
      console.log(arr)
      state.fansList = arr
    },
    // 获取关注列表
    setFollow: (state, data) => {
      state.followList = data
    }

  },
  actions: {
    // 获取fans列表
    getFansList: ({ commit }, data) => {
      commit('setFans', data)
    },
    // 获取关注列表
    getFollowList: ({ commit }, data) => {
      commit('setFollow', data)
    }
  }
}
