<template>
  <div>
    <div class="flex-column discussItem">
      <div class="userCont row"  @click="toUserInfo(discussItem.discuss.user)">
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          :src="discussItem.discuss.user.picture"
          class="userImage"
        />
        <div class="userInfotext d-flex flex-column j-center">
          <b class="name">{{discussItem.discuss.user.nickname}}</b>
          <span class="dis">{{discussItem.discuss.createdAt | changeTime}}</span>
        </div>
        <span class="reTalk" @click.stop="toBolgInfo(discussItem.blogId,discussItem.discussId)">回复</span>
      </div>
      <div class="content"  @click="toBolgInfo(discussItem.blogId,discussItem.discussId)">
        回复:<p v-html="$options.filters.atReplace(discussItem.discuss.content)"></p>
      </div>
    </div>
    <div class="blogWarp"  @click="toBolgInfo(discussItem.blogId,discussItem.discussId)">
      <div class="blogItem row">
        <img class="img" :src="discussItem.blog.user.picture" />
        <div class="userInfotext d-flex flex-column">
          <div class="name">{{discussItem.blog.user.nickname}}</div>
          <div class="text" v-html="$options.filters.atReplace(discussItem.blog.content)"></div>
        </div>
      </div>
    </div>
    <divider />
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
import { mapActions } from 'vuex'
export default {
  props: {
    discussItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions(['getAtAllCount']),
    // 跳转到用户详情
    toUserInfo (user) {
      this.$router.push({ path: `/userInfo/:${user.userName}` })
    },
    // 跳转到博客详情
    toBolgInfo (blogId, discussId) {
      this.$emit('changeData', { blogId, discussId })
    }
  },
  components: {
    [VanImage.name]: VanImage
  }
}
</script>
<style lang="less" scoped>
.discussItem {
  padding: 10px 10px 10px 10px;
  .userCont {
    align-items: center;
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
    .reTalk {
      font-size: 4vw;
      padding: 3px 10px;
      border: 1px solid #666;
      border-radius: 10vw;
      margin-left: auto;
      color: #666;
    }
  }
  .content {
    margin: 2vw;
    font-size: 4.3vw;
    color: #1b1a1a;
  }

}
.blogWarp{
    padding: 10px;
    background: #f9f8f8;
.blogItem {
     height: 17vw;
    width: 100%;
    overflow: hidden;
    background: #fff;
  img {
    width: 17vw;
    height: 17vw;
    margin-right: 10px;
  }
  .userInfotext {
    .name {
      font-size: 4.2vw;
      color: #1b1a1a;
    }
    .text {
      width: 75vw;
      font-size: 4vw;
      height: 12vw;
      line-height: 6vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
}
</style>
