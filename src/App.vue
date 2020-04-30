<template>
  <div id="app">
    <router-view  />
    <zr-tabbar v-if="!(this.path === '/login' || this.path === '/register')" />
  </div>
</template>
<script>
import zrTabbar from './components/common/tabbar'
export default {
  data () {
    return {
      path: '',
      flag: false
    }
  },
  computed: {
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
  components: {
    zrTabbar
  }
}
</script>

<style lang="less">
@import url("./assets/css/default.less");
@import url("./assets/css/iconfont.css");
</style>
