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
        <router-link to="/message">
          <span class="iconfont">&#xe60c;</span>
          <b>好友</b>
        </router-link >
      </li>
      <li style="position: relative;">
        <router-link to="/atMe">
          <i v-if="count" class="notice">{{count}}</i>
          <span class="iconfont">&#xe633;</span>
          <b>消息</b>
        </router-link >
      </li>
      <li>
        <router-link to="/setting">
          <span class="iconfont">&#xe66f;</span>
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
  props: {
    count: {
      type: Number,
      default: null
    }
  },
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
.notice{
  position:absolute;
  top: 5px;
  right: 3vw;
      background: red;
    border-radius: 5vw;
    height: 5vw;
    display: block;
    color: #ffffff;
    text-align: center;
    line-height: 5vw;
    font-size: 3vw;
    font-style: normal;
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 1.5vw;
}
</style>
