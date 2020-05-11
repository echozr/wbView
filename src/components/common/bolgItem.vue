<template>
  <div>
    <div class="blogItem flex-column" >
      <div class="userCont row">
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          src="https://iconfont.alicdn.com/t/1552034771470.png@100h_100w.jpg"
          class="userImage"
        />
        <div class="userInfo d-flex flex-column j-center">
          <b class="name">我叫陈小希</b>
          <span class="dis">aaa-fasfh 背景</span>
        </div>
      </div>
      <p class="blogContent">343fasdfhjkfhakfhfaklfd</p>
      <ul class="blogImgWarp row">
        <li v-for="index in 7" :key="index">
          <van-image
            width="29vw"
            height="29vw"
            Lazy-Load
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </li>
      </ul>
    </div>
    <divider />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { Image as VanImage, Lazyload, ImagePreview } from 'vant'

export default {
  props: {
    blogItem: {
      type: Object,
      default () {
        return {}
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
  padding: 10px;
  .userCont {
    .userImage {
      margin-right: 3vw;
    }
    .userInfo {
      .name {
        font-size: 4.2vw;
        color: #1b1a1a;
      }
      .dis {
        font-size: 3.5vw;
        color: #999;
      }
    }
  }
  .blogContent {
    margin: 3vw;
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
</style>
