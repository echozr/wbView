<template>
  <div>
    <div class="blogItem flex-column">
      <div class="userCont row"  @click="userInfoClick && toUserInfo(blogItem.user)">
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          :src="blogItem.user.picture "
          class="userImage"
        />
        <div class="userInfotext d-flex flex-column j-center">
          <b class="name">{{blogItem.user.nickname}}</b>
          <span class="dis">{{blogItem.createdAt|changeTime}}</span>
        </div>
      </div>
      <div @click=" blogInfoClick && toBolgInfo(blogItem.id)">
          <p class="blogContent" v-html="$options.filters.atReplace(blogItem.content)"></p>
          <ul class="blogImgWarp row" v-if="blogItem.blogUploads.length>0">
              <li v-for="(item,index) in blogItem.blogUploads" :key="index">
                <van-image width="29vw" height="29vw" Lazy-Load :src="item" @click.stop="HandleclickImg(index)" />
              </li>
          </ul>
      </div>
      <div class="tab_control" v-if="praiseClick">
        <div class="tab_item" @click="toBolgInfo(blogItem.id)">
          <span class="iconfont">&#xe60e;</span>
          <b>{{blogItem.discusses}}</b>
        </div>
        <div class="tab_item" :class="{'active':blogItem.praisePerson}" @click="praiseClick && doPraise(blogItem.praisePerson)">
          <span class="iconfont">&#xe620;</span>
          <b>{{blogItem.praises}}</b>
        </div>
      </div>
    </div>
    <divider />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { Image as VanImage, Lazyload, ImagePreview, Notify } from 'vant'
export default {
  props: {
    blogItem: {
      type: Object,
      default () {
        return {
        }
      }
    },
    userInfoClick: {
      type: Boolean,
      default: false
    },
    blogInfoClick: {
      type: Boolean,
      default: false
    },
    praiseClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 查看图片
    HandleclickImg (index) {
      ImagePreview({
        images: this.blogItem.blogUploads,
        startPosition: index
      })
    },
    // 跳转到用户详情
    toUserInfo (user) {
      console.log(user)
      this.$router.push({ path: `/userInfo/:${user.userName}` })
    },
    // 跳转到博客详情
    toBolgInfo (blogId) {
      console.log(blogId)
      this.$router.push({ path: `/blogInfo/:${blogId}` })
    },
    // 点赞获取消
    async doPraise (type) {
      // 取消点赞
      const params = {
        blogId: this.blogItem.id
      }
      if (type) {
        const { status, data } = await this.$axios.praise.unPraise(params)
        if (status === 200 && data) {
          this.$emit('addPraise')
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      } else { // 点赞
        const { status, data } = await this.$axios.praise.addPraise(params)
        if (status === 200 && data) {
          this.$emit('addPraise')
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      }
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [ImagePreview.name]: ImagePreview
  }
}
</script>
<style lang="less" scoped>
.blogItem {
  padding: 10px 10px 10px 10px;
  .userCont {
    .userImage {
      margin-right: 3vw;
    }
    .userInfotext {
      .name {
        font-size: 4.2vw;
        color: #1b1a1a;
      }
      .dis {
        font-size: 3.5vw;
        color: #999;
        line-height: 6vw;
      }
    }
  }
  .blogContent {
    margin: 2vw;
    font-size: 4.3vw;
    color: #1b1a1a;
  }
  .blogImgWarp {
    width: 93vw;
    margin: 0 auto;
    li {
      width: 29vw;
      height: 29vw;
      flex: 0 0 29vw;
      margin: 1vw;
    }
  }
  }
  .tab_control{
    width: 91vw;
    height: 10vw;
    margin: 5px auto 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 4.5vw;
    color: #9e9e9e;
    border-top: 1px solid #eeeeee;
    margin-bottom: -10px;
    .tab_item{
      width: 45.5vw;
      height: 10vw;
      flex: 0 0 45.5vw;
      text-align: center;
      line-height: 10vw;
      &.active{
        color:#f75050;
      }
      span{
        font-size: 5vw;
        margin-right: 5px;
      }
      b{
        font-weight: normal;
      }
    }
}

</style>
