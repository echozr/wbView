<template>
  <div class="userInfo">
    <div div class="header">
      <span class="leftIcon iconfont"  @click="close">&#xe609;</span>
      <div class="title">发微博</div>
      <span  class="rightIcon"  ><button v-show ="content!=''" class="iconfont"  @click="save" :disabled='disabled' >&#xe61c;</button></span>
    </div>
    <div >
      <van-field  ref="textArea"  class="editor" v-model="content" rows="5" autosize type="textarea" maxlength="500" placeholder="分享新鲜事..." show-word-limit />
    </div>
    <div class="row btn_warp">
      <div class="icon_warp">
        <span class="iconfont" @click="showContact=true">&#xe60a;</span>
        <span class="iconfont" @click="emojiPicker=!emojiPicker">&#xe68e;</span>
      </div>
    </div>
    <divider/>
    <!-- 表情输入框 -->
    <VEmojiPicker v-show="emojiPicker" :showSearch="false" @select="selectEmoji" />
    <!-- 联系人弹框 -->
    <van-popup v-model="showContact" position="bottom" >
      <zr-contact  @close="closeCont" :contactList="contactList" :indexList="indexList"  @atContact="atInfo" />
    </van-popup>

    <div class="uploadWarp">
      <van-uploader v-model="fileList"   :max-count="9" :after-read="afterRead" @delete="delImg" />
    </div>
    <zr-loading  v-if="loading" />
  </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker'
import zrContact from '../blogInfo/contact'
import { Uploader, Field, Button, Image as VanImage, Notify, Popup } from 'vant'
import vPinYin from '../../utils/vPinYin'
import _tools from '../../utils/tools'
import { mapActions } from 'vuex'
export default {
  props: {
  },
  data () {
    return {
      content: '',
      loading: false,
      imageARR: [],
      fileList: [],
      disabled: false,
      emojiPicker: false,
      showContact: false,
      contactList: [],
      indexList: []
    }
  },
  mounted () {
    this.claerCont()
    this.getFollow()
  },
  methods: {
    ...mapActions(['createBlogAction']),
    // 关闭弹窗
    close () {
      this.$emit('close', false)
    },
    async afterRead (file) {
      const File = file.file
      const { data, status } = await this.$axios.util.upload(File)
      if (status === 200 && data) {
        if (data.code === 200) {
          this.imageARR.push(data.data.url)
          console.log(this.imageARR)
        } else {
          Notify({ type: 'error', message: ' 添加图片失败 ', duration: 1000 })
        }
      }
    },
    save () {
      this.disabled = true
      this.loading = true
      setTimeout(() => {
        this.creatBlod()
      }, 1000)
    },
    // 清空内容
    claerCont () {
      this.content = ''
      this.fileList = []
      this.imageARR = []
      this.emojiPicker = false
    },
    // 保存方法
    async creatBlod () {
      const { status, data } = await this.$axios.blog.creatBlog({
        content: _tools.utf16toEntities(this.content),
        image: this.imageARR
      })
      if (status === 200 && data) {
        if (data.code === 200) {
          Notify({ type: 'success', message: ' 发布成功！ ', duration: 1000 })
          const blog = data.data
          const item = {
            id: blog.id,
            content: blog.content,
            blogUploads: blog.image,
            user: blog.user
          }
          this.loading = false
          this.createBlogAction(item)
          setTimeout(() => {
            this.disabled = false
            this.claerCont()
            this.$emit('addBlog', { popStaue: false })
          }, 1000)
        } else {
          Notify({ type: 'success', message: ' 发布失败 ', duration: 1000 })
        }
      }
    },
    // 删除图片
    delImg (file) {
      console.log(file)
      this.imageARR = this.imageARR.filter(v => {
        console.log(v)
        return v.indexOf(file.file.name) === -1
      })
      console.log(this.imageARR)
    },
    selectEmoji (emoji) {
      this.content += emoji.data
    },
    // 关闭联系人面板
    closeCont (data) {
      this.showContact = data
    },
    // 点击联系人获取@信息
    atInfo (data) {
      this.showContact = false
      this.$refs.textArea.focus()
      this.content += data
    },
    // 获取关注人列表
    async getFollow () {
      const { status, data } = await this.$axios.follower.getFollower()
      if (status === 200 && data) {
        console.log(vPinYin)
        const pyArray = data.data.userList.map(v => vPinYin.changeTo(v.nickname)).filter((value, index, self) => {
          return self.indexOf(value) === index
        })
        const list = data.data.userList.map(v => {
          v.title = vPinYin.changeTo(v.nickname)
          return v
        })
        const newList = pyArray.map(v => {
          const person = {}
          person.title = v
          person.list = list.filter(item => item.title === v)
          return person
        })
        this.indexList = pyArray
        this.contactList = newList
      } else {
        Notify({ type: 'success', message: data.data, duration: 1000 })
      }
    }
  },
  components: {
    [Uploader.name]: Uploader,
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    VEmojiPicker,
    zrContact
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
.btn_warp{
  height: 12vw;
  justify-content: space-between;
  padding: 0 15px;
  background: #eee;
  align-items: center;
  .icon_warp{
    .iconfont{
      font-size: 7.5vw;
      margin: 0 10px;
      color: #666666;
    }
  }
}

#EmojiPicker {
  width:100vw!important;
}
</style>
