<template>
  <div class="container">
     <zr-header headerTitle="好友" :leftIconShow="false" :rightIconShow="false" />
      <van-tabs sticky v-model="active" :offset-top="45">
        <van-tab title="关注" >
          <van-list>
            <friendList  :follower = 'followList' @unFollow='Follow' />
          </van-list>
        </van-tab>
        <van-tab title="粉丝" >
          <fansList :fans='fansList' @addFollower='Follow' />
        </van-tab>
      </van-tabs>
      <zr-loading v-show="loading" />
  </div>
</template>
<script>
import zrHeader from '../components/common/header'
import friendList from '../components/message/friendList'
import fansList from '../components/message/fansList'
import { Tab, Tabs, List, Empty, Notify } from 'vant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'message',
  data () {
    return {
      active: 0,
      loading: true
    }
  },
  computed: {
    ...mapState({
      followList: state => state.follow.followList,
      fansList: state => state.follow.fansList
    })
  },
  mounted () {
    this.getFollow()
    this.getFans()
  },
  methods: {
    ...mapActions(['getFollowList', 'getFansList']),
    async getFollow () {
      const { status, data } = await this.$axios.follower.getFollower()
      this.loading = false
      if (status === 200 && data) {
        console.log(data)
        this.getFollowList(data.data.userList)
      } else {
        Notify({ type: 'success', message: data.data, duration: 1000 })
      }
    },
    async getFans () {
      const { status, data } = await this.$axios.follower.getFans()
      if (status === 200 && data) {
        console.log(data)
        this.getFansList(data.data.userList)
      } else {
        Notify({ type: 'success', message: data.data, duration: 1000 })
      }
    },
    Follow () {
      this.getFollow()
      this.getFans()
    }
  },
  components: {
    zrHeader,
    friendList,
    fansList,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Empty.name]: Empty
  }
}
</script>
<style lang="less" scoped>
</style>
