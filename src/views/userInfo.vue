<template>
  <div class="allContainer"  ref="viewBox">
      <detail-banner :currentUser="currentUser" :fans="fans" :follower="follower"  @Follower="changeFollower"></detail-banner>
      <div class="InfoHeader">
      <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
        <div class="iconfont header-abs-back">&#xe609;</div>
      </router-link>
      <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
        <router-link to="/">
          <div class="iconfont header-fixed-back">&#xe609;</div>
        </router-link>{{currentUser.nickname}}
      </div>
      </div>
      <van-tabs sticky v-model="active" :offset-top="45">
        <van-tab title="微博" >
          <van-list>
            <div v-if="blogs.length >0">
              <div v-for="(item,index) in blogs" :key="index">
                <blog-item :blogItem="item"></blog-item>
              </div>
            </div>
            <div v-else>
              <van-empty description="暂无数据" />
            </div>
          </van-list>
        </van-tab>
        <van-tab title="相册" >
          <time-line :imageList="images" />
        </van-tab>
      </van-tabs>
      <zr-loading v-show="loading" />
  </div>
</template>

<script>
import detailBanner from '../components/userInfo/banner'
import timeLine from '../components/userInfo/timeLine'
import blogItem from '../components/common/bolgItem'
import { Sticky, Tab, Tabs, List, Empty, Notify } from 'vant'
import _tools from '../utils/tools'
export default {
  name: 'userInfo',
  components: {
    detailBanner,
    timeLine,
    blogItem,
    [Sticky.name]: Sticky,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Empty.name]: Empty
  },
  data () {
    return {
      showAbs: true,
      blogs: [],
      images: [],
      NameParams: this.$route.params.userName.split(':')[1],
      opacityStyle: {
        opacity: 0
      },
      currentUser: {},
      fans: 0,
      follower: 0,
      active: 0,
      loading: true
    }
  },
  computed: {},
  methods: {
    handleScroll (scrollTop) {
      const top = scrollTop
      if (top > 40) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    },
    // 根据用户名获取图片数据
    async getPicture () {
      const { status, data } = await this.$axios.blog.getUploadByUser({ userName: this.NameParams })
      if (status === 200 && data) {
        this.images = _tools.groupingData(data.data.list, 'time')
      } else {
        Notify({ type: 'success', message: data.message })
      }
    },
    // 根据用户信息获取关注数量和粉丝
    async getFansAndFollower () {
      const { status, data } = await this.$axios.follower.getFansAndFollower({ userName: this.NameParams })
      if (status === 200 && data) {
        this.fans = data.data.fansCount
        this.follower = data.data.followerCount
      } else {
        Notify({ type: 'success', message: data.message })
      }
    },
    // 获取用户信息
    async getUserInfo () {
      const { status, data } = await this.$axios.user.getUserInfo({ userName: this.NameParams })
      if (status === 200 && data) {
        this.currentUser = data.data
      } else {
        Notify({ type: 'success', message: data.message })
      }
    },
    // 获取博客（待完善下拉加载功能）
    async getBlogs () {
      const { data, status } = await this.$axios.blog.getBlogList({ userName: this.NameParams })
      this.loading = false
      if (status === 200 && data) {
        this.blogs = data.data.blogList
      } else {
        Notify({ type: 'success', message: data.message })
      }
    },
    // 点击关注获取消关注，重新获取粉丝数量
    changeFollower () {
      this.getFansAndFollower()
    }
  },
  mounted () {
    this.getFansAndFollower()
    this.getUserInfo()
    this.getBlogs()
    this.getPicture()
    // 通过$refs获取dom元素
    this.box = this.$refs.viewBox
    // 监听这个dom的scroll事件
    this.box.addEventListener('scroll', () => {
      this.handleScroll(this.$refs.viewBox.scrollTop)
    }, false)
  },
  unmounted () {
    this.box = this.$refs.viewBox
    this.box.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less" scoped>
.allContainer{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  overflow-y: auto;
  .InfoHeader{
    .header-abs {
      position: absolute;
      left: 2vw;
      top: 2vw;
      width: 9vw;
      height: 9vw;
      line-height: 9vw;
      border-radius: 4.5vw;
      text-align: center;
      background: rgba(0, 0, 0, 0.8);
        .header-abs-back {
          color: #fff;
          font-size: 4.5vw;
        }
      }
      .header-fixed {
          z-index: 2;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 12vw;
          line-height: 12vw;
          text-align: center;
          color: #666;
          background: #eeefef;
          font-size: 4.5vw;
          .header-fixed-back {
                position: absolute;
                top: 0;
                left: 0;
                width: 13vw;
                text-align: center;
                font-size: 6vw;
                color: #666666;
          }
        }
  }
}
</style>
