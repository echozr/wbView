<template>
  <div>
    <div v-if="fans.length > 0">
      <div class="userCont row"  v-for="(item,index) in fans" :key="index" @click="userInfoClick && toUserInfo(item)" >
        <van-image
          round
          width="15vw"
          height="15vw"
          Lazy-Load
          :src="item.picture"
          class="userImage"
        />
        <div class="userInfotext d-flex flex-column j-center">
          <b class="name">{{item.nickname}}</b>
          <span class="dis">{{item.city}}</span>
        </div>
        <div class="foucn" v-if="item.isFollow">
          <van-button type="primary" size="small" round @click.stop='shwoAction(item.id,"cancal")'>取消关注</van-button>
        </div>
        <div class="foucn" v-else>
          <van-button class="gzBtn" type="primary" size="small" round @click.stop='shwoAction(item.id,"follow")'>关注</van-button>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>

    <van-action-sheet v-model="show" :actions="actions" :round="false" cancel-text="取消" close-on-click-action @cancel="onCancel" @select="onChange"/>
  </div>
</template>
<script>
import { Image as VanImage, ImagePreview, Button, ActionSheet, Empty, Notify } from 'vant'
export default {
  props: {
    fans: {
      type: Array,
      default () {
        return []
      }
    },
    userInfoClick: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      followId: null,
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
    onCancel () {
      this.show = false
    },
    async onChange (item) {
      console.log(item.name)
      // 取消关注
      if (item.name === '确认取消关注') {
        const { status, data } = await this.$axios.follower.unFollow({ followerId: this.followId })
        if (status === 200 && data) {
          Notify({ type: 'success', message: data.data, duration: 1000 })
          this.$emit('addFollower', this.followId)
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      } else { // 添加关注
        const { status, data } = await this.$axios.follower.addFollow({ followerId: this.followId })
        if (status === 200 && data) {
          Notify({ type: 'success', message: '关注成功', duration: 1000 })
          this.$emit('addFollower', this.followId)
        } else {
          // Notify({ type: 'success', message: data.message })
        }
      }
    },
    toUserInfo (user) {
      console.log(user)
      this.$router.push({ path: `/userInfo/:${user.userName}` })
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [ImagePreview.name]: ImagePreview,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Empty.name]: Empty
  }
}
</script>
<style lang="less" scoped>
.userCont {
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 3vw;
  border-bottom: 1px solid #f8f9fa;
  align-items: center;
  .userImage {
    margin-right: 3vw;
  }
  .userInfotext {
    width: 55vw;
    .name {
      font-size: 4.2vw;
      color: #1b1a1a;
      width: 100%;
      height: 6vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dis {
      font-size: 3.5vw;
      color: #999;
      line-height: 6vw;
      width: 100%;
      height: 6vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .foucn {
    width: 15vw;
    font-size: 4vw;
    .gzBtn{
      background: #fff;
      color: #07c160;
    }
    .van-button--small{
      width: 20vw;
    }
  }
}
</style>
