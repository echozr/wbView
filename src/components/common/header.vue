<template>
  <div div class="header">
    <span class="leftIcon iconfont" v-show='leftIconShow'>{{ leftText}}</span>
    <div class="title">{{headerTitle}}</div>
    <span class="rightIcon iconfont" v-show='rightIconShow'> {{rightText}}</span>
  </div>
</template>
<script>
export default {
  props: {
    // 显示文本
    headerTitle: {
      type: String,
      default: '我的'
    },
    // 显示左侧按钮
    leftIconShow: {
      type: Boolean,
      default: true
    },
    // 显示左侧内容
    leftText: {
      type: String,
      default: '&#xe609;'
    },
    rightIconShow: {
      type: Boolean,
      default: true
    },
    rightText: {
      type: String,
      default: '&#xe6a6;'
    }
  }
}
</script>
<style lang="less" scoped>
</style>
