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
      <div v-if="list.blogList.length >0">
        <div v-for="(item,index) in list.blogList" :key="index">
          <blog-item :blogItem="item"></blog-item>
        </div>
      </div>
      <div v-else>
        <div>暂无数据</div>
      </div>
    </div>
    <!-- 发表微博 -->
    <van-popup class="zrPop" v-model="show" get-container="#app" :overlay="true"  position="right">
      <add-blog  @close='closePopup' />
    </van-popup>
    <zr-loading v-if="loading" />
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import blogItem from '../components/common/bolgItem'
import addBlog from '../components/home/addBlog'
import { Popup, Skeleton } from 'vant'
export default {
  name: 'home',
  data () {
    return {
      show: false,
      loading: true,
      list: {
        blogList: [],
        pagesize: 5,
        pageIndex: 0,
        count: 0
      }
    }
  },
  mounted () {
    this.getBlogList()
  },
  methods: {
    closePopup (type) {
      this.show = type
    },
    addBlog () {
      this.show = true
    },
    async getBlogList () {
      const self = this
      const { data, status } = await this.$axios.blog.getBlogList({ pagesize: self.list.pagesize, pageIndex: self.list.pageIndex })
      console.log(data, status)
      if (status === 200 && data) {
        if (data.code === 200) {
          self.list = data.data
          self.loading = false
        }
      }
    }
  },
  components: {
    zrHeader,
    blogItem,
    addBlog,
    [Popup.name]: Popup,
    [Skeleton.name]: Skeleton

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
  z-index: 1000000;
  right: 4vw;
  color: #9E9E9E;
}

</style>
