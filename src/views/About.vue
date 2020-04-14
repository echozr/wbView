<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-nav-bar title="标题" left-text="返回" right-text="返回" left-arrow />
  </div>
</template>

<script>
import { Button, Cell, NavBar } from 'vant'
export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar
  }
}
</script>

<style lang="less" >
</style>
