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
    isLoading: false,
    talkShow: false,
    talkHeight: 54,
    emojiPicker: false, // 表情框
    discussList: {}, // 评论列表
    discussSonList: {}
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
    },
    setShowTalk: (state, data) => {
      console.log(data)
      if ('talkShow' in data) state.talkShow = data.talkShow
      if ('talkHeight' in data) state.talkHeight = data.talkHeight
      if ('emojiPicker' in data) state.emojiPicker = data.emojiPicker
    },
    setContent: (state, data) => {
      state.content += data
    },
    setDiscuss: (state, data) => {
      state.discussList = data
    },
    setSonDiscuss: (state, data) => {
      state.discussSonList = data
    },
    deleteSonDiscuss: (state, data) => {
      const newArr = state.discussSonList.children.filter(v => {
        if (v.id !== data) {
          return true
        }
      })
      state.discussSonList.children = newArr
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
    },
    // 获取评论列表
    getDiscuss: ({ commit }, data) => {
      return api.discuss.getDiscussList(data).then(res => {
        if (res.data.code === 200) {
          commit('setDiscuss', res.data.data)
        }
      })
    },
    deleteDiscussSon: ({ dispatch, commit }, data) => {
      debugger
      commit('deleteSonDiscuss', data.id)
      dispatch('getDiscuss', { blogId: data.blogId })
    }
  }
}
