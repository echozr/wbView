<template>
  <div id="app">
    <zr-header v-if="userInfo" />
    <router-view />
    <zr-nav  v-if="userInfo" />
  </div>
</template>
<script>
import zrHeader from './components/common/header'
import zrNav from './components/common/nav'
export default {
  data () {
    return {
      userInfo: false
    }
  },
  components: {
    zrHeader,
    zrNav
  }
}
</script>

<style lang="less">
@import url('./assets/css/default.less');
@import url('./assets/css/iconfont.css');
</style>
