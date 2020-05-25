/**
 * @description 博客的全局存储数据
 * @author zr
 */

import api from '@/api'
export default {
  state: {
    blogList: [],
    count: 0,
    loading: true,
    pagesize: 10,
    pageIndex: 1,
    finished: false,
    isLoading: false
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
    createBlog: (state, item) => {
      state.blogList.unshift(item)
      state.count += 1
    },
    // 加载更多
    setLoadMore: (state, data) => {
      for (let i = 0; i < data.blogList.length; i++) {
        state.blogList.push(data.blogList[i])
      }
      state.isLoading = false
      state.count = data.count
      state.pageIndex++
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
    createBlogAction: ({ commit }, item) => {
      commit('createBlog', item)
    },
    // 加载更多
    loadMore: ({ commit }, data) => {
      return api.blog.getBlogList(data).then(res => {
        if (res.data.code === 200) {
          commit('setLoadMore', res.data.data)
        }
      })
    }
  }
}
