<template>
  <div class="nav">
    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
  </div>
</template>
<script>
import { Col, Row } from 'vant'
export default {
  name: 'nav',
  components: {
    [Col.name]: Col,
    [Row.name]: Row
  }
}
</script>
<style lang="less">
</style>
