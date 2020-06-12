<template>
<div class="allContainer">
    <div class="InfoHeader">
        <div class="header-fixed">
            <router-link to="/">
                <div class="iconfont header-fixed-back">&#xe609;</div>
            </router-link>微博正文
        </div>
    </div>
    <div class="cont">
        <blog-item :blogItem="blogItem" :userInfoClick="true"></blog-item>
        <van-tabs sticky v-model="active" :offset-top="45">
            <van-tab>
                <div slot="title">评论</div>
                <div>
                    <van-list></van-list>
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
    <div class="tab_control">
        <div class="tab_item">
            <span class="iconfont">&#xe60e;</span>
            <b>评论</b>
        </div>
        <div class="tab_item" :class="{'active':blogItem.praisePerson}"  @click="doPraise">
            <span class="iconfont">&#xe620;</span>
            <b>点赞</b>
        </div>
    </div>
    <zr-loading v-show="loading" />
</div>
</template>
<script>
import blogItem from '../components/common/bolgItem'
import praiseList from '../components/blogInfo/praiseList'
import { Image as VanImage, Tab, Tabs, List, Empty, Notify } from 'vant'
import { mapActions } from 'vuex'
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
      praiseList: [],
      active: 0,
      loading: true
    }
  },
  mounted () {
    this.getBlogItem()
    this.getPraiseList()
  },
  methods: {
    ...mapActions(['getList']),
    // 根据blogId获取博客详情
    async getBlogItem () {
      const { status, data } = await this.$axios.blog.getBlogItem({ blogId: this.currertBlogId })
      console.log(status, data)
      if (status === 200 && data) {
        this.blogItem = data.data
        this.loading = false
      } else {
        Notify({ type: 'success', message: '获取详情失败' })
      }
    },
    // 根据博客ID获取点赞列表
    async getPraiseList () {
      const { status, data } = await this.$axios.praise.getPraiseUser({ blogId: this.currertBlogId })
      if (status === 200 && data) {
        this.praiseList = data.data.list
      } else {
        Notify({ type: 'success', message: '获取信息失败' })
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
          Notify({ type: 'success', message: data.message })
        }
      } else { // 点赞
        const { status, data } = await this.$axios.praise.addPraise(params)
        if (status === 200 && data) {
          this.getBlogItem()
          this.getPraiseList()
          this.getList()
        } else {
          Notify({ type: 'success', message: data.message })
        }
      }
    }
  },
  components: {
    blogItem,
    praiseList,
    [VanImage.name]: VanImage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Empty.name]: Empty
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
    position: fixed;
    bottom: 0;
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
</style>
