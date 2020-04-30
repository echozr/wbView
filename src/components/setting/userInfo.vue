<template>
  <div class="userInfo">
    <div div class="header">
      <span class="leftIcon iconfont" @click="close">&#xe609;</span>
      <div class="title">个人信息</div>
      <span class="rightIcon iconfont" @click="editClick">&#xe61c;</span>
    </div>
    <van-cell class="van-hairline--bottom"  title="头像" size="middle" >
      <template>
        <van-image v-if="!isEdit" round width="15vw" height="15vw" :src="user.picture" class="left-cont" />
        <van-uploader v-else  :max-count="1" :max-size="3 * 1024 * 1024" :after-read="afterRead">
          <van-image round width="15vw" height="15vw" :src="user.picture" class="left-cont" />
        </van-uploader>
        <van-icon v-if="isEdit" name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
    <van-cell class="van-hairline--bottom" title="昵称" size="middle" >
      <template>
        <van-field v-if="!isEdit" :value="user.nickname" readonly class="left-cont" input-align="right" />
        <van-field v-else v-model="user.nickname" class="left-cont" input-align="right" />
        <van-icon  v-if="isEdit" name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
      <van-cell class="van-hairline--bottom" title="用户名" size="middle" >
      <template>
        <van-field :value="user.userName" readonly class="left-cont" input-align="right" />
      </template>
    </van-cell>
      <van-cell class="van-hairline--bottom" title="性别" size="middle" >
      <template>
        <van-field v-if="!isEdit" :value="getGender" readonly class="left-cont" input-align="right" />
        <van-field v-else readonly clickable name="picker" :value="getGender" placeholder="选择性别" class="left-cont" input-align="right"  @click="show= true"/>
        <van-icon  v-if="isEdit" name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
      <van-cell class="van-hairline--bottom" title="城市" size="middle" >
      <template>
        <van-field  v-if="!isEdit"  :value="user.city" readonly class="left-cont" input-align="right" />
        <van-field v-else readonly clickable name="picker" :value="user.city" placeholder="选择城市" class="left-cont" input-align="right"  @click="showCity= true"/>
        <van-icon  v-if="isEdit" name="arrow" class="van-cell__right-icon right-arror" />
      </template>
    </van-cell>
    <van-button v-if="isEdit" type="primary" block @click="saveInfo">保存编辑</van-button>
    <!-- 性别弹出框 -->
    <van-popup v-model="show" position="bottom" get-container="#app">
      <van-picker show-toolbar  :columns="columns"  @confirm="onConfirm" @cancel="show = false" />
    </van-popup>
    <!-- 城市弹出框 -->
    <van-popup v-model="showCity" position="bottom" get-container="#app">
      <van-picker show-toolbar  :columns="columnsCity"  @confirm="onConfirmCity" @cancel="showCity = false" />
    </van-popup>
    <zr-loading v-show='loading' />
  </div>
</template>
<script>
import { Cell, Uploader, Icon, Field, Picker, Popup, Button, Notify, Image as VanImage } from 'vant'
export default {
  props: {
    userInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      user: {
        nickname: '',
        userName: '',
        city: '',
        picture: '',
        gender: ''
      },
      columns: [{ text: '男', value: '1' }, { text: '女', value: '2' }, { text: '保密', value: '3' }],
      columnsCity: ['北京市', '天津市', '西安市', '上海市', '成都市', '广州市', '深圳市'],
      show: false,
      showCity: false,
      isEdit: false,
      loading: false
    }
  },
  mounted () {
    this.user = this.userInfo
  },
  methods: {
    // 关闭弹窗
    close () {
      this.$emit('close', false)
    },
    // 编辑用户
    editClick () {
      this.isEdit = true
    },
    // 选择性别picker
    onConfirm (value) {
      console.log(value)
      this.user.gender = value.value
      this.show = false
    },
    // 选择城市picker
    onConfirmCity (v) {
      console.log(v)
      this.user.city = v
      this.showCity = false
    },
    // 上传头像
    async afterRead (file) {
      this.user.picture = file.content
      this.loading = true
      const File = file.file
      const { data, status } = await this.$axios.util.upload(File)
      this.loading = false
      if (status === 200 && data) {
        if (data.code === 200) {
          this.user.picture = data.data.url
        } else {
          Notify({ type: 'success', message: data.message })
        }
      }
    },
    // 保存编辑
    async saveInfo () {
      console.log(this.user)
      this.loading = true
      const { data, status } = await this.$axios.user.changeInfo(this.user)
      this.loading = false
      if (status === 200 && data) {
        if (data.code === 200) {
          localStorage.setItem('userInfo', JSON.stringify(this.user))
          this.isEdit = false
          Notify({ type: 'success', message: data.data })
        } else {
          Notify({ type: 'success', message: data.message })
        }
      }
    }
  },
  computed: {
    getGender () {
      let data = ''
      if (this.user.gender === '1') {
        data = '男'
      } else if (this.user.gender === '2') {
        data = '女'
      } else {
        data = '保密'
      }
      return data
    }
  },
  components: {
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button
  }
}
</script>
<style lang="less" scoped>
.userInfo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.van-cell {
  align-items: center;
}
.van-cell:not(:last-child)::after {
  bottom: -50%;
}
.left-cont{
    margin-right: 5vw;
    padding: 0 auto;
}
.right-arror{
    position: absolute;
    right: -5px;
    top: 50%;
    margin-top: -12px;
}
</style>
