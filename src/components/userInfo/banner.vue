<template>
  <div class="banner">
    <img class="banner-img bg-blur" :src="currentUser.picture || dafaultImg " />
    <div class="banner-info">
      <van-image round class="avater" Lazy-Load :src="currentUser.picture"/>
      <div class="userName">{{currentUser.nickname}}</div>
      <div class="fans">
        <div class="txt-shadow right">
          关注
          <span>{{ fans }}</span>
        </div>
        <div class="txt-shadow left">
          粉丝
          <span>{{ follower}}</span>
        </div>
      </div>
      <p class="fil-desc">
        个人签名：{{currentUser.city}}
      </p>
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
export default {
  name: 'banner',
  props: {
    fans: {
      type: Number,
      default: 0
    },
    follower: {
      type: Number,
      default: 0
    },
    currentUser: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dafaultImg: 'http://127.0.0.1:3000/1591172738522.timg.jpg',
      Info: {}
    }
  },
  components: {
    [VanImage.name]: VanImage
  }
}
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 60vw;
  .banner-img {
    width: 100%;
    &.bg-blur {
        float: left;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        -webkit-filter: blur(25px);
        -moz-filter: blur(25px);
        -o-filter: blur(25px);
        -ms-filter: blur(25px);
        filter: blur(25px);
    }
  }
  .banner-info {
    position: absolute;
    width: 80vw;
    height: 50vw;
    top: 5vw;
    left: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avater {
      width: 20vw;
      height: 20vw;
      border-radius: 10vw;
      margin: 5vw auto 2vw;
    }
    .userName {
      font-size: 5.5vw;
      color: #ffffff;
      margin-bottom: 1vw;
    }
    .fans{
      display: flex;
      flex-direction: row;
      font-size: 4.5vw;
      color: #ffffff;
        .txt-shadow{
          padding: 0 8px;
          position: relative;
          width: 40vw;
          &.right{
            text-align: right;
          }
          &.left{
            text-align: left;
          }
          &:last-child:before {
            content: "";
            width: 100%;
            height: 80%;
            position: absolute;
            top: 10%;
            left: 0;
            border-left: 1px solid hsla(0,0%,100%,.3);
          }
      }
    }
    .fil-desc{
      font-size: 3.5vw;
      color: #ffffff;
      margin-top: 2vw;
      width: 100%;
      height: 10vw;
      line-height: 10vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
