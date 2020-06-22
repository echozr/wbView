<template>
<div>
  <div v-if="list.length>0">
    <div class="discussCont row" v-for="(item,index) in list" :key="index" >
        <van-image
          round
          width="10vw"
          height="10vw"
          Lazy-Load
          :src="item.user.picture"
          class="userImage"
          @click="toUserInfo(item.user)"
        />
        <div class="userInfotext  align-items-center" @click.prevent="newAction(item)">
          <p class="UserName">{{item.user.nickname}}</p>
          <div class="content" v-html="$options.filters.atReplace(item.content)">
          </div>
          <div v-if='item.children.length>0' class="secondWarp" @click.stop='openSonList(item)'>
            <ul>
              <li  v-for="(vItem,idx) in item.children"  :key="idx" >
                <div v-if="idx<3">
                  <span class="secondName">{{vItem.user.nickname}}：</span>
                  <span v-html="$options.filters.atReplace(vItem.content)">
                  </span>
                </div>
              </li>
            </ul>
            <p class="total">共{{item.children.length}}条回复></p>
          </div>
          <div class="row  bottomInfo">
            <span>{{item.createdAt|changeTime}}</span>
            <span class="iconfont talk" @click.stop="sonDiscuss(item)">&#xe60e;</span>
          </div>
        </div>
    </div>
  </div>
  <div v-else>
    <van-empty description="暂无数据" />
  </div>
  <!-- 回复删除action -->
  <van-action-sheet v-model="show" :actions="actions" :round="false" cancel-text="取消" close-on-click-action @cancel="show = false" @select="onChange"/>
  <!-- 确认删除 -->
  <van-action-sheet v-model="deleteShow" :actions="deleteActions"  description="删除评论后，评论下的所有回复都会被删除" :round="false" cancel-text="取消" close-on-click-action @cancel="deleteShow = false" @select="deleteChange"/>
  <!-- 子评论列表 -->
  <van-popup class="zrPop" v-model="showSonDis"  get-container="#app" :overlay="true"  position="right">
     <son-discuss @closeSonDis="closeSonDis" @sonDiscussTalk='sonDiscussTalk' />
  </van-popup>
</div>
</template>
<script>
import { Image as VanImage, Empty, ActionSheet, Notify, Popup } from 'vant'
import sonDiscuss from './sonDiscuss'
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      blogItem: {},
      actions: [],
      deleteActions: [{ name: '确认删除', color: 'red' }],
      show: false,
      deleteShow: false,
      showSonDis: false
      // sonDiscusslist: {}
    }
  },
  methods: {
    ...mapActions(['getDiscuss']),
    ...mapMutations(['setSonDiscuss']),
    // 点击子评论
    sonDiscuss (item) {
      this.$emit('sonDiscuss', {
        id: item.id,
        blogId: item.blogId
      })
    },
    sonDiscussTalk (item) {
      this.showSonDis = true
      localStorage.setItem('content', item.content)
      this.$emit('sonDiscuss', {
        id: item.parentId,
        blogId: item.blogId
      })
    },
    // 点击回复action
    newAction (item) {
      this.blogItem = item
      const userName = JSON.parse(localStorage.getItem('userInfo')).userName
      this.actions = userName === item.user.userName ? [{ name: '回复' }, { name: '删除', color: 'red' }] : [{ name: '回复' }]
      this.show = true
    },
    // 跳转到用户详情页
    toUserInfo (user) {
      this.$router.push({ path: `/userInfo/:${user.userName}` })
    },
    onChange (data) {
      switch (data.name) {
        case '回复':
          this.sonDiscuss(this.blogItem)
          break
        case '删除':
          this.deleteShow = true
          break
        default:
          break
      }
    },
    // 确认删除
    async deleteChange (data) {
      if (data.name === '确认删除') {
        console.log(this.blogItem)
        const { status, data } = await this.$axios.discuss.deleteDiscuss({ discussId: this.blogItem.id })
        if (status === 200 && data) {
          debugger
          this.getDiscuss({ blogId: this.blogItem.blogId })
        } else {
          Notify({ type: 'success', message: data.message, duration: 1000 })
        }
      }
    },
    // 查看评论详情页
    async openSonList (item) {
      const { status, data } = await this.$axios.discuss.getDiscussSon({ discussId: item.id })
      if (status === 200 && data) {
        this.showSonDis = true
        this.setSonDiscuss(data.data.list[0])
      } else {
        Notify({ type: 'success', message: data.message, duration: 1000 })
      }
    },
    // 关闭评论详情页
    closeSonDis (data) {
      this.showSonDis = data
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Empty.name]: Empty,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    sonDiscuss
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
