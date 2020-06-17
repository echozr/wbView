<template>
<div>
  <div v-if="list.length>0">
    <div class="discussCont row" v-for="(item,index) in list" :key="index">
        <van-image
          round
          width="10vw"
          height="10vw"
          Lazy-Load
          :src="item.user.picture"
          class="userImage"
        />
        <div class="userInfotext  align-items-center">
          <p class="UserName">{{item.user.nickname}}</p>
          <div class="content" v-html="setAt(item.content)"></div>
          <div v-if='item.children.length>0' class="secondWarp">
            <ul>
              <li  v-for="(vItem,idx) in item.children"  :key="idx" >
                <div v-if="idx<3">
                  <span class="secondName">{{vItem.user.nickname}}：</span>
                  <span v-html="setAt(vItem.content)"></span>
                </div>
              </li>
            </ul>
            <p class="total">共{{item.children.length}}条回复></p>
          </div>
          <div class="row  bottomInfo">
            <span>{{item.createdAt}}</span>
            <span class="iconfont talk" @click="sonDiscuss(item)">&#xe60e;</span>
          </div>
        </div>
    </div>
  </div>
  <div v-else>
    <van-empty description="暂无数据" />
  </div>
</div>
</template>
<script>
import { Image as VanImage, Empty } from 'vant'
import _tools from '../../utils/tools'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 替换@字符换成链接
    setAt (item) {
      return _tools.atReplace(item)
    },
    // 点击子评论
    sonDiscuss (item) {
      this.$emit('sonDiscuss', item)
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Empty.name]: Empty
  }
}
</script>
<style lang="less" scoped>
.discussCont{
  .userImage{
    padding: 10px;
  }
  .userInfotext{
    flex: 1;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 10px 10px 0px;
    .UserName{
      line-height: 24px;
      font-size: 4vw;
      color: #666;
    }
    .content{
      font-size: 4.3vw;
      line-height: 24px;
    }
    .secondWarp{
      background: #eee;
      margin: 5px 0;
      padding: 10px;
      li{
        font-size: 4vw;
        color: #666666;
        margin: 5px 0;
        .secondName{
          color:#2999cc;
        }
      }
      .total{
        font-size: 4vw;
        color:#2999cc;
        margin: 5px 0;
      }
    }
    .bottomInfo{
      color: #9e9e9e;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 4vw;
      .talk{
        font-size: 6vw;
      }
    }
  }
}

</style>
