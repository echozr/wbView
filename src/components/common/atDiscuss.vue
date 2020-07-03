<template>
  <div>
    <div class="flex-column discussItem">
      <div class="userCont row"  @click="toUserInfo(discussItem.user)">
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          :src="discussItem.user.picture"
          class="userImage"
        />
        <div class="userInfotext d-flex flex-column j-center">
          <b class="name">{{discussItem.user.nickname}}</b>
          <span class="dis">{{discussItem.createdAt | changeTime}}</span>
        </div>
        <span class="reTalk" @click.stop="toBolgInfo(discussItem.atRelations[0].blogId,discussItem.atRelations[0].discussId)">回复</span>
      </div>
      <div class="content"  @click="toBolgInfo(discussItem.atRelations[0].blogId,discussItem.atRelations[0].discussId)">
        回复:<p v-html="$options.filters.atReplace(discussItem.content)"></p>
      </div>
    </div>
    <div class="blogWarp"  @click="toBolgInfo(discussItem.atRelations[0].blogId,discussItem.atRelations[0].discussId)">
      <div class="blogItem row">
        <img class="img" :src="discussItem.atRelations[0].blog.user.picture" />
        <div class="userInfotext d-flex flex-column">
          <div class="name">{{discussItem.atRelations[0].blog.user.nickname}}</div>
          <div class="text" v-html="$options.filters.atReplace(discussItem.atRelations[0].blog.content)"></div>
        </div>
      </div>
    </div>
    <divider />
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
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
    p{
      display: inline-block;
    }
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
