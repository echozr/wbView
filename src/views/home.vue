<template>
  <div class="container">
    <div class="iconfont addIcon" @click="addBlog">&#xe6a6;</div>
    <zr-header headerTitle="微博广场" :leftIconShow="false" :rightIconShow="false" />
    <div v-if="loading">
      <div v-for="index in 3" :key="index">
        <van-skeleton title avatar avatar-size="20vw" :row="10" />
      </div>
    </div>
    <div  v-else class="contain">
      <div v-if="blogList.length >0">
        <van-list v-model="isLoading"  :finished="finished"   finished-text="没有更多了"   @load="onLoad" >
          <div v-for="(item,index) in blogList" :key="index">
            <blog-item :blogItem="item"></blog-item>
          </div>
        </van-list>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </div>
    <!-- 发表微博 -->
    <van-popup class="zrPop" v-model="show" get-container="#app" :overlay="true"  position="right">
      <add-blog  @close='closePopup' @addBlog='addBlogInfo' />
    </van-popup>
    <zr-loading  v-show="loading" />
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import blogItem from '../components/common/bolgItem'
import addBlog from '../components/home/addBlog'
import { Popup, Skeleton, Empty, List } from 'vant'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      show: false,
      timer: null
    }
  },
  computed: {
    ...mapState({
      blogList: state => state.blog.blogList,
      count: state => state.blog.count,
      loading: state => state.blog.loading,
      pageIndex: state => state.blog.pageIndex,
      finished: state => state.blog.finished,
      isLoading: state => state.blog.isLoading
    })
  },
  beforeCreate () {
    this.$store.dispatch('getList', {})
  },
  methods: {
    ...mapActions(['loadMore']),
    closePopup (type) {
      this.show = type
    },
    addBlog () {
      this.show = true
    },
    addBlogInfo (data) {
      this.show = data.popStaue
      console.log(data)
    },
    onLoad () {
      if (this.blogList.length >= this.count) {
        this.$store.state.blog.isLoading = false
        this.$store.state.blog.finished = true
      } else {
        this.$store.state.blog.isLoading = true
        return this.loadMore({
          pagesize: this.pagesize,
          pageIndex: this.pageIndex
        })
      }
    }
  },
  components: {
    zrHeader,
    blogItem,
    addBlog,
    [Popup.name]: Popup,
    [Skeleton.name]: Skeleton,
    [Empty.name]: Empty,
    [List.name]: List
  }
}
</script>
<style lang="less" scoped>
.van-skeleton{
  margin: 10px auto;
}
.addIcon{
  font-size: 6vw;
  position: absolute;
  top: 3vw;
  right: 4vw;
  color: #9E9E9E;
}

</style>
