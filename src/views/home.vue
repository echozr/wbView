<template>
  <div class="container">
    <zr-header headerTitle="微博广场" :leftIconShow="false" :rightIconShow="false" />
    <div class="contain">
      <div>
        <blog-item></blog-item>
      </div>
    </div>
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import blogItem from '../components/common/bolgItem'
export default {
  name: 'home',
  components: {
    zrHeader,
    blogItem
  }
}
</script>
<style lang="less" scoped>

</style>
