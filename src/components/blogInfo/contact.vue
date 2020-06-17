<template>
  <div class="contact_warp">
    <div div class="header">
      <span class="leftIcon iconfont" @click="close">&#xe609;</span>
      <div class="title">联系人</div>
    </div>
    <div class="contact">
      <van-index-bar :index-list="indexList" :sticky="true" :sticky-offset-top="-1">
        <div v-for="(item,index1) in contactList" :key="index1">
          <van-index-anchor :index="item.title">{{item.title}}</van-index-anchor>
          <div class="userCont row" v-for="(v,index2) in item.list" :key="index2" @click="atContact(v)">
            <van-image round width="10vw" height="10vw" lazy-Load :src="v.picture" class="userImage"/>
            <b class="name">{{v.nickname}}</b>
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
import { IndexBar, IndexAnchor, Cell, Image as VanImage } from 'vant'
export default {
  props: {
    contactList: {
      type: Array,
      default () {
        return []
      }
    },
    indexList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
    atContact (v) {
      const info = `@${v.nickname}:${v.userName} `
      this.$emit('atContact', info)
    }
  },
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage
  }
}
</script>
<style lang="less" scoped>
.van-index-anchor{
  background-color: #eeeeee!important;
}
.van-index-bar__index{
  padding: 0!important;
  margin: 5px 4px 5px 16px!important;
}
.van-index-bar__index--active {
  color: #ffffff!important;
  background: #07c160!important;
  border-radius: 50%!important;
}
.contact_warp {
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  .contact {
    overflow-y: auto;
    height:93vh;
    .contact_title {
      background: #b1b1b1;
      text-align: left;
    }
  }
}
.userCont {
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  .userImage {
    padding: 8px;
  }
  .name{
    font-size: 4vw;
    color:#666666;
    font-weight: normal;
  }
}
</style>
