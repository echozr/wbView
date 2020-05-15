<template>
  <div class="userInfo">
    <div div class="header">
      <span class="leftIcon iconfont"  @click="close">&#xe609;</span>
      <div class="title">发微博</div>
      <span class="rightIcon iconfont" @click="save" >&#xe61c;</span>
    </div>
    <div >
      <van-field  class="editor" v-model="message" rows="5" autosize type="textarea" maxlength="500" placeholder="分享新鲜事..." show-word-limit />
    </div>
    <divider/>
    <div class="uploadWarp">
      <van-uploader v-model="fileList" multiple />
    </div>

  </div>
</template>
<script>
import { Uploader, Field, Button, Image as VanImage } from 'vant'
export default {
  props: {
  },
  data () {
    return {
      message: '',
      fileList: []
    }
  },
  methods: {
    // 关闭弹窗
    close () {
      this.$emit('close', false)
    },
    save () {
      console.log(this.fileList)
    }

  },
  components: {
    [Uploader.name]: Uploader,
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Button.name]: Button
  }
}
</script>
<style lang="less" >
.userInfo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .uploadWarp{
    width: 93vw;
    margin: 10px auto;
    .van-uploader__preview{
      margin: 1vw!important;
      .van-uploader__preview-image{
        width: 29vw!important;
        height: 29vw!important;
      }
    }
    .van-uploader__upload{
      width: 29vw!important;
      height: 29vw!important;
      margin: 1vw!important;
      .van-uploader__upload-icon{
        font-size: 8vw!important;
      }
    }
  }
}
</style>
