<template>
<div class="allContainer">
    <div class="InfoHeader">
        <div class="header-fixed">
            <router-link to="/">
                <div class="iconfont header-fixed-back">&#xe609;</div>
            </router-link>微博正文
        </div>
        <span v-if="myShow" class="more iconfont" @click="show=true">&#xe602;</span>
    </div>
    <div class="cont">
        <blog-item v-if="blogItem" :blogItem="blogItem" :userInfoClick="true"></blog-item>
        <van-tabs sticky v-model="active" :offset-top="45">
            <van-tab>
                <div slot="title">评论 {{discussList.count}}</div>
                <div>
                    <van-list>
                      <DiscussList :list='discussList.list' @sonDiscuss="sonDiscuss" />
                    </van-list>
                </div>
            </van-tab>
            <van-tab>
                <div slot="title" class="tit_warp">
                        <van-image class="ava-img" v-if="blogItem.praisePerson" round width="5vw" height="5vw" Lazy-Load  :src="currentUser.picture " />
                        赞 {{blogItem.praises}}</div>
                <div>
                    <van-list>
                        <div v-if="praiseList.length">
                            <div v-for="(item,index) in praiseList" :key="index">
                                <praiseList  :userItem="item" />
                            </div>
                        </div>
                        <div v-else>
                            <van-empty description="暂无数据" />
                        </div>
                    </van-list>
                </div>
            </van-tab>
        </van-tabs>
    </div>
    <div class="tab_control" >
          <div class="tab_item" @click="doDiscuss(-1,blogItem.id)">
              <span class="iconfont">&#xe60e;</span>
              <b>评论</b>
          </div>
          <div class="tab_item" :class="{'active':blogItem.praisePerson}"  @click="doPraise">
              <span class="iconfont">&#xe620;</span>
              <b>点赞</b>
          </div>
    </div>
    <!-- 回复删除action -->
    <van-action-sheet v-model="show" get-container="#app" :actions="actions" :round="false" cancel-text="取消" close-on-click-action @cancel="show = false" @select="onChange"/>
    <zr-loading v-show="loading" />
</div>
</template>
<script>
import blogItem from '../components/common/bolgItem'
import DiscussList from '../components/blogInfo/discussList'
import praiseList from '../components/blogInfo/praiseList'
import { Image as VanImage, Tab, Tabs, List, Empty, Notify, ActionSheet } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'blogInfo',
  data () {
    return {
      currentUser: JSON.parse(localStorage.getItem('userInfo')),
      currertBlogId: this.$route.params.id.split(':')[1],
      blogItem: {
        blogUploads: [],
        content: '',
        createdAt: '',
        id: 9,
        praisePerson: false,
        praises: 1,
        user: {
          city: '',
          nickname: '',
          picture: '',
          userName: ''
        }
      },
      show: false,
      actions: [{ name: '确认删除', color: 'red' }],
      praiseList: [],
      active: 0,
      loading: true,
      bottomHieght: 0
    }
  },
  computed: {
    ...mapState({
      discussList: state => state.blog.discussList
    }),
    myShow () {
      const myself = this.blogItem.user.userName
      const loginSelf = JSON.parse(localStorage.getItem('userInfo')).userName
      return myself === loginSelf
    }
  },
  mounted () {
    this.getPraiseList()
    this.getBlogItem()
    // 获取评论列表
    this.getDiscuss({ blogId: this.currertBlogId })
  },
  methods: {
    ...mapActions(['getList', 'getDiscuss']),
    ...mapMutations(['setShowTalk']),
    // 根据blogId获取博客详情
    async getBlogItem () {
      const { status, data } = await this.$axios.blog.getBlogItem({ blogId: this.currertBlogId })
      console.log(status, data)
      if (status === 200 && data) {
        this.blogItem = data.data
        this.loading = false
      } else {
        Notify({ type: 'success', message: '获取详情失败', duration: 1000 })
      }
    },
    // 根据博客ID获取点赞列表
    async getPraiseList () {
      const { status, data } = await this.$axios.praise.getPraiseUser({ blogId: this.currertBlogId })
      if (status === 200 && data) {
        this.praiseList = data.data.list
      } else {
        Notify({ type: 'success', message: '获取信息失败', duration: 1000 })
      }
    },
    // 点赞获取消
    async doPraise (type) {
      // 取消点赞
      const params = {
        blogId: this.blogItem.id
      }
      if (this.blogItem.praisePerson) {
        const { status, data } = await this.$axios.praise.unPraise(params)
        if (status === 200 && data) {
          this.getBlogItem()
          this.getPraiseList()
          this.getList()
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      } else { // 点赞
        const { status, data } = await this.$axios.praise.addPraise(params)
        if (status === 200 && data) {
          this.getBlogItem()
          this.getPraiseList()
          this.getList()
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      }
    },
    // 点击评论
    doDiscuss (type, blogId) {
      localStorage.setItem('parentId', type)
      localStorage.setItem('discussBlogId', blogId)
      // 通过vuex 控制评论框
      this.setShowTalk({ talkShow: true })
    },
    // 点击子评论
    sonDiscuss (item) {
      this.doDiscuss(item.id, item.blogId)
    },
    async onChange (type) {
      switch (type.name) {
        case '确认删除':
          // eslint-disable-next-line no-case-declarations
          const { status, data } = await this.$axios.blog.deleteBlog({ blogId: this.blogItem.id })
          if (status === 200 && data) {
            this.getList()
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          }
          break
        default:
          break
      }
    }
  },
  components: {
    blogItem,
    praiseList,
    DiscussList,
    [VanImage.name]: VanImage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Empty.name]: Empty,
    [ActionSheet.name]: ActionSheet
  }
}
</script>
<style lang="less" scoped>
.allContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  overflow-y: auto;
  display: flex;
  flex-direction:column;
  .InfoHeader {
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
  .tab_control {
    width: 100vw;
    height: 10vw;
    margin: 5px auto 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 4.5vw;
    color: #9e9e9e;
    border-top: 1px solid #eeeeee;
    margin-top: auto;
    background: #ffffff;
    .tab_item {
      width: 50vw;
      height: 10vw;
      flex: 0 0 45.5vw;
      text-align: center;
      line-height: 10vw;
      &.active {
        color: #f75050;
      }
      span {
        font-size: 5vw;
        margin-right: 5px;
      }
      b {
        font-weight: normal;
      }
    }
  }
  .cont {
    position: fixed;
    top: 12vw;
    bottom: 10vw;
    left: 0;
    right: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .tit_warp{
    display: flex;
    justify-content: center;
    align-items: center;
    .ava-img{
        margin-right: 5px;
    }
  }
}
.more {
  font-size: 7vw;
  position: fixed;
  right: 5vw;
  top: 2vw;
  z-index: 10000;
  color: #666666;
}
</style>
