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
      <div class="follow" v-if="isMySelf">
        <van-button v-if='isFollow' type="primary" size="small" round @click.stop='shwoAction(currentUser.id,"cancal")'>取消关注</van-button>
        <van-button v-else class="gzBtn" type="primary" size="small" round @click.stop='shwoAction(currentUser.id,"follow")'>关注</van-button>
      </div>
    </div>
     <van-action-sheet v-model="show" :actions="actions" :round="false" cancel-text="取消" close-on-click-action @cancel="onCancel" @select="onChange"/>
  </div>
</template>
<script>
import { Image as VanImage, Button, ActionSheet, Notify } from 'vant'
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
  watch: {
    currentUser (newVal, oldVal) {
      console.log(newVal)
      this.Follow(newVal.id)
      this.isMySelf = newVal.id !== JSON.parse(localStorage.getItem('userInfo')).id
    }
  },
  data () {
    return {
      dafaultImg: 'http://127.0.0.1:3000/1591172738522.timg.jpg',
      Info: {},
      show: false,
      followId: null,
      isFollow: true,
      isMySelf: false,
      actions: [{ name: '确认取消关注' }]
    }
  },
  methods: {
    shwoAction (id, type) {
      console.log(type)
      this.actions = type === 'cancal' ? [{ name: '确认取消关注' }] : [{ name: '添加关注' }]
      this.followId = id
      this.show = true
    },
    async Follow (id) {
      if (id) {
        const { status, data } = await this.$axios.follower.isFollow({ followerId: id })
        if (status === 200 && data) {
          this.isFollow = data.data === 1
        } else {
          Notify({ type: 'success', message: 'chengg', duration: 1000 })
        }
      }
    },
    async onChange (item) {
      console.log(item.name)
      // 取消关注
      if (item.name === '确认取消关注') {
        const { status, data } = await this.$axios.follower.unFollow({ followerId: this.followId })
        if (status === 200 && data) {
          Notify({ type: 'success', message: data.data, duration: 1000 })
          this.isFollow = false
          this.$emit('Follower')
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      } else { // 添加关注
        const { status, data } = await this.$axios.follower.addFollow({ followerId: this.followId })
        if (status === 200 && data) {
          Notify({ type: 'success', message: '关注成功', duration: 1000 })
          this.isFollow = true
          this.$emit('Follower')
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      }
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet
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
    height: 55vw;
    top: 1vw;
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
      font-size: 4vw;
      color: #ffffff;
      margin-bottom: 1vw;
    }
    .fans{
      display: flex;
      flex-direction: row;
      font-size: 4vw;
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
      width: 100%;
      height: 7vw;
      line-height: 7vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

  .gzBtn{
    background: #fff;
    color: #07c160;
  }
</style>
