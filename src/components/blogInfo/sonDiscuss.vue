<template>
  <div class="userInfo">
    <div div class="header">
      <span class="leftIcon iconfont" @click="close">&#xe609;</span>
      <div class="title">{{list.children.length}}条回复</div>
      <span class="rightIcon"></span>
    </div>
    <div class="content" v-if='list.children.length'>
      <div class="firstDis">
        <div class="row">
          <img class="userImage" :src="list.user.picture"  />
          <div class="userInfotext">
            <p class="UserName">{{list.user.nickname}}</p>
            <span class="time">{{list.createdAt|changeTime}}</span>
            <div class="cont" v-html="$options.filters.atReplace(list.content)"></div>
            <span class="back" @click="close">查看原微博</span>
          </div>
        </div>
      </div>
      <div class="secondDisWarp">
        <div class="row" v-for="(item,index) in list.children" :key="index" @click="newAction(item)">
          <img class="userImageSmall" :src="item.user.picture" />
          <div class="userInfotext bod">
            <p class="UserName">{{item.user.nickname}}</p>
            <span class="time">{{item.createdAt|changeTime}}</span>
            <div class="cont" v-html="$options.filters.atReplace(item.content)"></div>
          </div>
        </div>
      </div>
    </div>
  <!-- 回复删除action -->
  <van-action-sheet v-model="show" get-container="#app" :actions="actions" :round="false" cancel-text="取消" close-on-click-action @cancel="show = false" @select="onChange"/>
  <!-- 确认删除 -->
  <van-action-sheet v-model="deleteShow"  get-container="#app" :actions="deleteActions"  description="删除评论后，评论下的所有回复都会被删除" :round="false" cancel-text="取消" close-on-click-action @cancel="deleteShow = false" @select="deleteChange"/>
  <zr-loading v-show="isLoad" />
  </div>
</template>
<script>
import { ActionSheet, Notify } from 'vant'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      discussItem: {},
      actions: [],
      deleteActions: [{ name: '确认删除', color: 'red' }],
      show: false,
      deleteShow: false,
      isLoad: false,
      dataList: {},
      text: ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.blog.discussSonList
    })
  },
  methods: {
    ...mapActions(['deleteDiscussSon']),
    // 点击回复action
    newAction (item) {
      this.discussItem = item
      const userName = JSON.parse(localStorage.getItem('userInfo')).userName
      this.actions = userName === item.user.userName ? [{ name: '回复' }, { name: '删除', color: 'red' }] : [{ name: '回复' }]
      this.show = true
    },
    onChange (data) {
      switch (data.name) {
        case '回复':
          debugger
          this.text = `回复@${this.discussItem.user.userName}:${this.discussItem.user.nickname}`
          this.discussItem.content = this.text
          console.log(this.discussItem)
          this.$emit('sonDiscussTalk', this.discussItem)
          break
        case '删除':
          this.deleteShow = true
          break
        default:
          break
      }
    },
    // 确认删除
    async deleteChange (type) {
      this.isLoad = true
      if (type.name === '确认删除') {
        const { status, data } = await this.$axios.discuss.deleteOne({ discussId: this.discussItem.id })
        if (status === 200 && data) {
          this.isLoad = false
          this.deleteDiscussSon({ id: this.discussItem.id, blogId: this.discussItem.blogId })
        } else {
          Notify({ type: 'success', message: data.message })
        }
      }
    },
    close () {
      this.$emit('closeSonDis', false)
    }
  },
  components: {
    [ActionSheet.name]: ActionSheet
  }
}
</script>
<style lang="less" scoped>
.userImage {
  padding: 10px;
  width: 14vw;
  height: 14vw;
  border-radius: 14vw;
}
.userImageSmall{
  padding: 10px;
  width: 10vw;
  height: 10vw;
  border-radius: 10vw;
}
.userInfotext {
  flex: 1;
  padding: 10px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  &.bod{
    border-bottom: 1px solid #d4d1d1;
  }
  .UserName {
    line-height: 24px;
    font-size: 4vw;
    color: #666;
  }
  .time{
    font-size: 3vw;
    color: #a7a7a7;
  }
  .cont {
    font-size: 4.3vw;
    line-height: 24px;
  }
  .back{
    font-size: 4vw;
    color: #2999cc;
    margin: 5px 0;
  }
}
.secondDisWarp{
    background: #eee;
    margin: 5px 0;
    padding: 10px;
}
</style>
