<template>
  <div class="talk_container">
    <div >
      <van-field ref="textArea"  class="editor" v-model="contentText" rows="5" autosize type="textarea" maxlength="500" placeholder="写评论..." show-word-limit  />
    </div>
    <div class="row btn_warp">
      <div class="icon_warp">
        <span class="iconfont" @click="showContact=true">&#xe60a;</span>
        <span class="iconfont" @click="showEmoji">&#xe68e;</span>
      </div>
      <van-button round type="primary" size="small" @click="sendDiscuss" :disabled='disabled'>发送</van-button>
    </div>
    <!-- 表情输入框 -->
    <VEmojiPicker v-show="emojiPicker" :showSearch="false" @select="selectEmoji" />
    <!-- 联系人弹框 -->
    <van-popup v-model="showContact" position="bottom" >
      <zr-contact  @close="closeCont" :contactList="contactList" :indexList="indexList"  @atContact="atInfo" />
    </van-popup>
  </div>
</template>
<script>
import { Field, Button, Popup, Notify } from 'vant'
import VEmojiPicker from 'v-emoji-picker'
import zrContact from '../components/blogInfo/contact'
import { mapMutations, mapState, mapActions } from 'vuex'
import vPinYin from '../utils/vPinYin'
import _tools from '../utils/tools'
export default {
  data () {
    return {
      showContact: false,
      contentText: '',
      atNumber: 0,
      contactList: [],
      indexList: [],
      disabled: false
    }
  },
  computed: {
    ...mapState({
      emojiPicker: state => state.blog.emojiPicker,
      content: state => state.blog.content
    })
  },
  mounted () {
    this.getFollow()
  },
  methods: {
    ...mapMutations(['setShowTalk', 'setContent']),
    ...mapActions(['getDiscuss', 'getList', 'addSonDiscuss']),
    // 显示表情窗口
    showEmoji () {
      this.setShowTalk({
        emojiPicker: !this.emojiPicker,
        talkHeight: this.emojiPicker ? 54 : 164,
        talkShow: true
      })
    },
    // 选择表情
    selectEmoji (emoji) {
      this.contentText += emoji.data
    },
    // 关闭联系人面板
    closeCont (data) {
      this.showContact = data
    },
    // 监听输入的值是否是@
    // inputText (value) {
    //   const length = value.split(' @').length - 1
    //   console.log(length, this.atNumber)
    //   if (length > this.atNumber) {
    //     this.contentText = this.contentText.substr(0, this.contentText.length - 1)
    //     this.atNumber++
    //     this.showContact = true
    //   }
    // },
    // 点击联系人获取@信息
    atInfo (data) {
      this.showContact = false
      this.$refs.textArea.focus()
      this.contentText += data
    },
    // 点击评论
    async sendDiscuss () {
      this.disabled = true
      const content = localStorage.getItem('content')
      const parentId = Number(localStorage.getItem('parentId'))
      const blogId = Number(localStorage.getItem('discussBlogId'))
      const { status, data } = await this.$axios.discuss.addDiscuss({ parentId, blogId, content: content + _tools.utf16toEntities(this.contentText) })
      if (status === 200 && data) {
        this.setShowTalk({
          emojiPicker: false,
          talkHeight: 54,
          talkShow: false
        })
        localStorage.setItem('content', '')
        this.contentText = ''
        this.getDiscuss({ blogId })
        this.getList()
        this.addSonDiscuss({ blogId, parentId })
        setTimeout(() => {
          this.disabled = false
        }, 3000)
      } else {
        Notify({ type: 'success', message: data.message })
      }
    },
    // 获取关注人列表
    async getFollow () {
      const { status, data } = await this.$axios.follower.getFollower()
      this.loading = false
      if (status === 200 && data) {
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
        Notify({ type: 'success', message: data.data })
      }
    }
  },
  components: {
    VEmojiPicker,
    zrContact,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup
  }
}
</script>
<style lang="less" scoped>
#EmojiPicker{
  width: 100%;
  height: 110vw;
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

</style>
