<template>
  <div id="app">
    <router-view  />
    <zr-tabbar v-if="!(this.path === '/login' || this.path === '/register')"  :count='atAllCount'/>
    <van-popup :value="talkShow" position="bottom" :style="{ height: `${talkHeight}vw` }" @click-overlay="closeTalk">
        <zr-talk />
    </van-popup>
  </div>
</template>
<script>
import zrTabbar from './components/common/tabbar'
import { Popup } from 'vant'
import zrTalk from './views/talk'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      path: '',
      flag: false,
      show: true
    }
  },
  beforeCreate () {
    this.$store.dispatch('getAtAllCount', {})
  },
  computed: {
    ...mapState({
      talkHeight: state => state.blog.talkHeight,
      atAllCount: state => state.blog.atAllCount
    }),
    talkShow: {
      get () {
        return this.$store.state.blog.talkShow
      },
      set (value) {
        this.$store.state.blog.talkShow = value
      }
    }
  },
  mounted () {
    this.path = this.$route.path
  },
  watch: {
    $route (to, from) {
      this.path = to.path
      console.log(this.path)
    }
  },
  methods: {
    ...mapActions(['getAtAllCount']),
    ...mapMutations(['setShowTalk']),
    // 点击遮罩层
    closeTalk () {
      const data = {
        talkShow: false,
        talkHeight: 54,
        emojiPicker: false
      }
      this.setShowTalk(data)
    }
  },
  components: {
    zrTabbar,
    zrTalk,
    [Popup.name]: Popup
  }
}
</script>

<style lang="less">
@import url("./assets/css/default.less");
@import url("./assets/css/iconfont.css");
</style>
