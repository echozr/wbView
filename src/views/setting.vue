<template>
  <div class="container">
    <zr-header headerTitle="我的" :leftIconShow="false" :rightIconShow="false" />
    <div class="contain">
      <div class="avait van-hairline--top-bottom" @click="openPopup">
        <img :src="userInfo.picture" />
        <div class="content">
          <h3 class="name">{{userInfo.nickname}}</h3>
          <p class="dis">{{userInfo.city}}</p>
        </div>
        <van-icon name="arrow" class="van-cell__right-icon ml-auto" />
      </div>
      <divider />
      <van-cell title="修改密码" is-link @click="openPassword" />
      <divider />
      <van-button type="primary" block @click="Logout">退出</van-button>
    </div>
    <!-- 修改用户信息 -->
    <van-popup class="zrPop" v-model="show" get-container="#app" :overlay="true"  position="right">
      <zr-setUser  @close='closePopup' :userInfo="userInfo" />
    </van-popup>
     <!-- 修改密码 -->
     <van-popup class="zrPop" v-model="showPass" get-container="#app" :overlay="true"  position="right">
      <zr-password  @close='closePass'  />
    </van-popup>
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import { Cell, Button, Icon, Popup } from 'vant'
import zrSetUser from '../components/setting/userInfo'
import zrPassword from '../components/setting/changePassword'
export default {
  name: 'setting',
  data () {
    return {
      userInfo: {},
      show: false,
      showPass: false
    }
  },
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  components: {
    zrHeader,
    zrSetUser,
    zrPassword,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  methods: {
    openPopup () {
      this.show = true
    },
    openPassword () {
      this.showPass = true
    },
    closePopup (type) {
      this.show = type
    },
    closePass (type) {
      this.showPass = type
    },
    async Logout () {
      const { data, status } = await this.$axios.user.logout()
      if (status === 200 && data) {
        if (data.code === 200) {
          localStorage.clear()
          this.$router.push({ path: '/login' })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avait {
  width: 90vw;
  height: 30vw;
  display: flex;
  flex-direction: row;
  padding: 0 5vw;
  align-items: center;
  background: #ffffff;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
  .content {
    height: 20vw;
    display: flex;
    flex-direction: column;
    width: 58vw;
    margin-left: 3vw;
    .name {
      height: 10vw;
      line-height: 10vw;
      font-size: 5vw;
    }
    .dis {
      height: 10vw;
      line-height: 10vw;
      font-size: 4vw;
      color: #808080;
    }
  }
}
.zrPop{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
}
</style>
