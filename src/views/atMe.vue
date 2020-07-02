<template>
  <div class="container">
     <zr-header headerTitle="@我的" :leftIconShow="false" :rightIconShow="false" />
      <van-tabs sticky v-model="active" :offset-top="45">
        <van-tab>
            <template #title>微博 <i v-if="atBlog" class="notice">{{atBlog}}</i></template>
            <div v-if="blogList.length >0">
              <div v-for="(item,index) in blogList" :key="index" >
                <blog-item :isRead="true" :blogItem="item" :userInfoClick="true" :blogInfoClick="true" :praiseClick="true" @addPraise="getAtBlog" ></blog-item>
              </div>
            </div>
            <div v-else>
              <van-empty description="暂无数据" />
            </div>
        </van-tab>
        <van-tab >
          <template #title>评论 <i v-if="atDiscuss" class="notice">{{atDiscuss}}</i></template>
            <div v-if="discussList.length >0">
              <div v-for="(item,index) in discussList" :key="index" >
                <at-discuss :discussItem="item"  @changeData="changeData"></at-discuss>
              </div>
            </div>
            <div v-else>
              <van-empty description="暂无数据" />
            </div>
        </van-tab>
      </van-tabs>
      <zr-loading v-show="loading" />
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import blogItem from '../components/common/bolgItem'
import atDiscuss from '../components/common/atDiscuss'
import { Tab, Tabs, Notify, Empty } from 'vant'
import { mapState } from 'vuex'
export default {
  name: 'atMe',
  data () {
    return {
      blogList: [],
      discussList: [],
      active: 0,
      loading: true
    }
  },
  computed: {
    ...mapState({
      atBlog: state => state.blog.atBlog,
      atDiscuss: state => state.blog.atDiscuss
    })
  },
  mounted () {
    this.getAtBlog()
    this.getDiscuss()
  },
  methods: {
    async getAtBlog () {
      const { status, data } = await this.$axios.util.getAtBlog()
      this.loading = false
      if (status === 200 && data) {
        this.blogList = data.data.blogList
      } else {
        Notify({ type: 'success', message: data.message, duration: 1000 })
      }
    },
    async getDiscuss () {
      const { status, data } = await this.$axios.util.getAtDiscuss()
      if (status === 200 && data) {
        console.log(data)
        this.discussList = data.data.rows
      } else {
        Notify({ type: 'success', message: data.message, duration: 1000 })
      }
    },
    async changeData ({ blogId, discussId }) {
      const { status } = await this.$axios.util.changeRead({ blogId, discussId })
      if (status === 200 || status === 204) {
        // this.getAtAllCount()
        console.log(1)
        // this.$router.push({ path: `/blogInfo/:${blogId}` })
      }
    }
  },
  components: {
    zrHeader,
    blogItem,
    atDiscuss,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Empty.name]: Empty
  }
}
</script>
<style lang="less" scoped>
.notice{
  top: -3px;
  right: -6vw;
}
</style>
