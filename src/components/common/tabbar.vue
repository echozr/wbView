<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to="/" >
          <span class="iconfont">&#xe61f;</span>
          <b>微博</b>
        </router-link>
      </li>
      <li>
        <router-link to="/resetPassword">
          <span class="iconfont">&#xe61f;</span>
          <b>消息</b>
        </router-link >
      </li>
      <li>
        <router-link to="/setting">
          <span class="iconfont">&#xe61f;</span>
          <b>我的</b>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
import { Col, Row } from 'vant'
export default {
  name: 'tabbar',
  components: {
    [Col.name]: Col,
    [Row.name]: Row
  }
}
</script>
<style lang="less">
.router-link-exact-active {
  .iconfont {
    color: #7cc1e0;
  }
  b {
    color: #7cc1e0;
  }
}
</style>
