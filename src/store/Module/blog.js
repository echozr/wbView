/**
 * @description 博客的全局存储数据
 * @author zr
 */

import api from '@/api'
export default {
  state: {
    blogList: [],
    count: 0,
    loading: true
  },
  getter: {
  },
  mutations: {
    setList: (state, data) => {
      state.blogList = data.blogList
      state.count = data.count
      state.loading = false
    },
    // 创建微博地址
    createBlog (state, item) {
      state.blogList.unshift(item)
      state.count += 1
    }
  },
  actions: {
    // 获取列表
    getList: ({ commit }, data) => {
      return api.blog.getBlogList(data).then(res => {
        if (res.data.code === 200) {
          commit('setList', res.data.data)
        }
      })
    },
    // 添加微博
    createBlogAction ({ commit }, item) {
      commit('createBlog', item)
    }
  }
}
