<template>
  <div>
    <div class="userCont row" @click="userInfoClick && toUserInfo(userItem.user)">
      <van-image
        round
        width="10vw"
        height="10vw"
        Lazy-Load
        :src="userItem.user.picture "
        class="userImage"
      />
      <div class="userInfotext row align-items-center">
        <div class="name_warp d-flex flex-column j-center" >
          <b class="name">{{userItem.user.nickname}}</b>
          <span class="dis">{{userItem.user.city}}</span>
        </div>
        <div class="zan">
          <span class="iconfont">&#xe620;</span> 赞
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
export default {
  props: {
    userItem: {
      type: Object,
      default () {
        return {}
      }
    },
    userInfoClick: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toUserInfo (user) {
      console.log(user)
      this.$router.push({ path: `/userInfo/:${user.userName}` })
    }
  },
  components: {
    [VanImage.name]: VanImage
  }
}
</script>
<style lang="less" scoped>
.userImage{
  padding: 8px;
}
.userInfotext {
    font-size: 4vw;
    border-bottom: 1px solid #eeeeee;
    flex: 1;
    align-items: center;
    .name_warp {
      padding-left: 10px;
      .name{
        font-size: 4.5vw;
      }
      .dis{
        color: #808080;
      }
    }
}
.zan{
  margin-left: auto;
  margin-right: 10px;
  font-size: 4px;
  color: #f75050;
}

</style>
