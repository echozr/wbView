<template>
  <div>
    <div class="blogItem flex-column">
      <div class="userCont row"  @click="userInfoClick && toUserInfo(blogItem.user)">
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          :src="blogItem.user.picture"
          class="userImage"
        />
        <div class="userInfotext d-flex flex-column j-center">
          <b class="name">{{blogItem.user.nickname}}</b>
          <span class="dis">{{blogItem.user.city}}</span>
        </div>
      </div>
      <div @click=" blogInfoClick && toBolgInfo(blogItem.id)">
          <p class="blogContent">{{blogItem.content}}</p>
          <ul class="blogImgWarp row" v-if="blogItem.blogUploads.length>0">
              <li v-for="(item,index) in blogItem.blogUploads" :key="index">
                <van-image width="29vw" height="29vw" Lazy-Load :src="item" @click.stop="HandleclickImg(index)" />
              </li>
          </ul>
      </div>
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
    },
    userInfoClick: {
      type: Boolean,
      default: false
    },
    blogInfoClick: {
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
    HandleclickImg (index) {
      ImagePreview({
        images: this.blogItem.blogUploads,
        startPosition: index
      })
    },
    toUserInfo (user) {
      console.log(user)
      this.$emit('toUserInfo', user)
    },
    toBolgInfo (blogId) {
      console.log(blogId)
      this.$emit('toBolgInfo', blogId)
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
    .userInfotext {
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
