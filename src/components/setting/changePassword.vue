<template>
  <div class="userInfo">
    <div div class="header">
      <span class="leftIcon iconfont" @click="close">&#xe609;</span>
      <div class="title">修改密码</div>
      <span class="rightIcon"></span>
    </div>
    <van-cell class="van-hairline--bottom" title="旧密码" size="middle" >
      <template>
        <van-field v-model="password.password" class="left-cont" input-align="right" type="password" placeholder="请输入旧密码" />
        <van-icon  name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
      <van-cell class="van-hairline--bottom" title="新密码" size="middle" >
      <template>
         <ValidationProvider rules="required|password" name="password" v-slot="{ errors }">
          <van-field
            v-model="password.newPassword"
            name="password"
            type="password"
            placeholder="请输入新密码"
            class="left-cont"
            input-align="right"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <van-icon  name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
    <van-cell class="van-hairline--bottom" title="确认新密码" size="middle" >
      <template>
         <van-field
            v-model="password.confirmPassword"
            type="password"
            name="newPassword"
            placeholder="请再次输入新密码"
            class="left-cont"
            input-align="right"
            :error-message="errMsg"
            @blur="validator"/>
        <van-icon  name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
    <van-button type="primary" block @click="saveInfo">保存编辑</van-button>
    <zr-loading v-show='loading' />
  </div>
</template>
<script>
import { Cell, Icon, Field, Button, Notify } from 'vant'
export default {
  data () {
    return {
      password: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false,
      errMsg: ''
    }
  },
  methods: {
    // 关闭弹窗
    close () {
      this.$emit('close', false)
    },
    validator () {
      if (this.password.newPassword !== this.password.confirmPassword) {
        this.errMsg = '两次密码输入不一致'
      } else {
        this.errMsg = ''
      }
    },
    // 保存编辑
    async saveInfo () {
      if (this.errMsg === '') {
        this.loading = true
        const { data, status } = await this.$axios.user.changePassword(this.password)
        this.loading = false
        if (status === 200 && data) {
          if (data.code === 200) {
            Notify({ type: 'success', message: data.data })
            localStorage.clear()
            setTimeout(() => {
              this.$router.push({ path: '/login' })
            }, 2000)
          } else {
            Notify({ type: 'success', message: data.message })
          }
        }
      }
    }
  },
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button
  }
}
</script>
<style lang="less" scoped>
.userInfo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.van-cell {
  align-items: center;
}
.van-cell:not(:last-child)::after {
  bottom: -50%;
}
.left-cont{
    margin-right: 5vw;
    padding: 0 auto;
}
.right-arror{
    position: absolute;
    right: -5px;
    top: 50%;
    margin-top: -12px;
}
.van-cell__title{
  flex: 0 0 30vw;
}
.left-cont {
  .van-field__error-message{
    text-align: right!important;
  }
}
</style>
