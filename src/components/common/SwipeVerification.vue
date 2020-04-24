<!--
/**
* @name SwipeVerification
* @description 滑动图片验证
* @author zr
* @date 2019-12-27
* @param {Object} showSlidingValidation  显示隐藏验证码组件
* @return {Event} handleSlidingValidation   隐藏验证码组件事件
*/-->

<template>
  <div
    class="sliding-validation-wrapper"
    :class="{'sliding-validation-wrapper-error':error}"
    v-show="showSlidingValidation"
  >
    <div class="sliding-validation-top">
      <p>请完成安全验证</p>
      <i class="iconfont" @click="handleReload()">&#xe68c;</i>
      <i class="iconfont" @click="handleClose()">&#xe607;</i>
    </div>
    <div
      class="sliding-validation-image-wrapper"
      :class="{'sliding-validation-image-wrapper-success': success}"
    >
      <div class="sliding-validation-image-loading" v-show="loading">
        <span></span>
      </div>
      <canvas ref="canvas"></canvas>
      <canvas ref="blockCanvas"></canvas>
      <p
        class="sliding-validation-image-hint"
        :style="{'bottom': error ? 0 + 'px': -30 + 'px'}"
      >拖动滑块将图片正确拼合</p>
      <p
        class="sliding-validation-image-hint-success"
        :style="{'bottom': success ? 0 + 'px': -30 + 'px'}"
      >本次用时{{successTime}}秒</p>
    </div>
    <div class="sliding-validation-block-wrapper">
      <div
        class="sliding-validation-block"
        :class="statusClass"
        :style="{'width':width + 'px'}"
        ref="slidingValidationBlock"
      >
        <div
          v-if="type === false"
          class="sliding-validation-button"
          :class="{'sliding-validation-button-hover':hover&&statusClass ===''}"
          @mousedown="handleSliding"
          @mouseover="hover = true"
          ref="slidingValidationButton"
        >
          <i class="iconfont">&#xe65d;</i>
        </div>
        <div
          v-else
          class="sliding-validation-button"
          :class="{'sliding-validation-button-hover':hover&&statusClass ===''}"
          @touchstart.prevent="touchstartHandle"
          @touchmove="touchmoveHandle"
          @touchend="hover = true"
          ref="slidingValidationButton"
        >
          <i class="iconfont">&#xe65d;</i>
        </div>
      </div>
      <p class="sliding-validation-hint" v-show="hint">向右拖动滑块完成上方拼图</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlidingValidation',
  components: {},
  props: {
    showSlidingValidation: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      over: 'mousemove',
      up: 'mouseup',
      type: false,
      // 显示验证码
      show: this.showSlidingValidation,
      // 滑块dom
      el: null,
      // 鼠标相对滑块的位置
      disX: 0,
      // 滑块容器宽度
      width: 40,
      // 滑块状态
      statusClass: '',
      // 是否移入滑块
      hover: false,
      // 是否显示提示信息
      hint: true,
      // 验证码画布
      imageCtx: null,
      // 补丁画布
      blockCtx: null,
      // 补丁dom
      blockDom: null,
      // 画布宽
      imageWidth: 280,
      // 画布高
      imageheight: 140,
      // 补丁宽高
      blocklength: 40,
      // 补丁凸起半径
      blockRadii: 5,
      // 补丁偏移量X
      blockX: 0,
      // 验证码拼接错误
      error: false,
      // 验证码拼接正确
      success: false,
      // 拼图失败次数
      failure: 0,
      // 图片加载loading
      loading: false,
      // 验证用时
      successTime: 0,
      // 验证开始时间
      beginDate: null
    }
  },
  mounted () {
    if (this.$tools._isMobile() !== null) {
      this.type = true
      this.over = 'touchmove'
      this.up = 'touchend'
    } else {
      this.type = false
      this.over = 'mousemove'
      this.up = 'mouseup'
    }
    this.initCanvas()
  },
  methods: {
    // 范围生成随机整数
    genRandom (min, max) {
      return ((Math.random() * (max - min + 1)) | 0) + min
    },
    // 创建画布
    createCanvas () {
      const canvas = this.$refs.canvas
      canvas.width = this.imageWidth
      canvas.height = this.imageheight
      this.imageCtx = canvas.getContext('2d')
      const blockCanvas = this.$refs.blockCanvas
      blockCanvas.width = this.blocklength + this.blockRadii
      blockCanvas.height = this.blocklength + this.blockRadii
      this.blockDom = blockCanvas
      this.blockCtx = blockCanvas.getContext('2d')
    },
    // 创建图片
    createImage (onload) {
      this.loading = true
      const img = document.createElement('img')
      img.crossOrigin = 'Anonymous'
      img.src = require(`../../assets/img/varificay/${parseInt(Math.random() * (5 - 1 + 1) + 1, 10)}.jpg`)
      img.onload = () => {
        this.loading = false
        onload()
      }
      img.onerror = e => {
        console.log('验证码图加载失败')
        console.log(e)
      }
      return img
    },
    // 初始化图片
    initImage () {
      const img = this.createImage(() => {
        this.blockX = this.genRandom(100, 200)
        const y = this.genRandom(20, 80)
        this.imageCtx.drawImage(img, 0, 0, this.imageWidth, this.imageheight)
        const imageData = this.imageCtx.getImageData(
          this.blockX,
          y - this.blockRadii,
          this.blocklength + this.blockRadii,
          this.blocklength + this.blockRadii
        )
        this.blockCtx.putImageData(imageData, 0, 0)
        this.drawBlock(
          this.blockCtx,
          this.blocklength + this.blockRadii,
          this.blockRadii
        )
        this.drawImageVacancy(
          this.imageCtx,
          this.blocklength,
          this.blockRadii,
          this.blockX,
          y
        )
        this.blockDom.style.top = y - this.blockRadii + 'px'
      })
    },
    // 绘制图片空缺
    drawImageVacancy (ctx, l, r, x, y) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l / 2, y, r, 1 * Math.PI, 0)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l, y + l / 2, r, 1.5 * Math.PI, 0.5 * Math.PI)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.arc(x, y + l / 2, r, 0.5 * Math.PI, 1.5 * Math.PI, true)
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.fill()
    },
    // 绘制补丁
    drawBlock (ctx, l, r) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(l, 0)
      ctx.lineTo(l, l)
      ctx.lineTo(l, l)
      ctx.lineTo(l - r, l)
      ctx.arc(l - r, (l - r) / 2 + r, r, 0.5 * Math.PI, 1.5 * Math.PI, true)
      ctx.lineTo(l - r, r)
      ctx.arc((l - r) / 2, r, r, 0, 1 * Math.PI, true)
      ctx.lineTo(0, r)
      ctx.arc(0, (l - r) / 2 + r, r, 0.5 * Math.PI, 1.5 * Math.PI, true)
      ctx.clip()
      ctx.globalCompositeOperation = 'xor'
      ctx.strokeStyle = '#00ff99'
      ctx.lineWidth = '16'
      ctx.lineCap = 'round'
      ctx.fill()
    },
    // 初始化
    initCanvas () {
      this.createCanvas()
      this.initImage()
    },
    // 滑块拖拽
    handleSliding (event) {
      if (this.error || this.loading) {
        return false
      }
      const clientX = event.clientX
      this.beginDate = new Date()
      // 获取滑块
      this.el = this.$refs.slidingValidationButton
      // 算出鼠标相对滑块的位置
      this.disX = clientX - this.el.offsetLeft
      // 鼠标按下并移动时
      window.addEventListener(this.over, this.mousemoveFun, false)
      // 鼠标弹起时
      window.addEventListener(this.up, this.mouseupFun, false)
    },
    // 触摸开始
    touchstartHandle (event) {
      if (this.error || this.loading) {
        return false
      }
      const clientX = event.touches[0].clientX
      this.beginDate = new Date()
      // 获取滑块
      this.el = this.$refs.slidingValidationButton
      // 算出鼠标相对滑块的位置
      this.disX = clientX - this.el.offsetLeft
    },
    touchmoveHandle (event) {
      // 鼠标按下并移动时
      window.addEventListener(this.over, this.mousemoveFun, false)
      // 鼠标弹起时
      window.addEventListener(this.up, this.mouseupFun, false)
    },
    // 鼠标按下并移动函数
    mousemoveFun (event) {
      const clientX = this.type ? event.touches[0].clientX : event.clientX
      // 隐藏提示文字
      this.hint = false
      // 滑块状态改变
      this.statusClass = 'sliding-validation-block-active'
      // 用鼠标的位置减去鼠标相对滑块的位置，得到滑块的位置
      const x = clientX - this.disX
      let left = 0
      if (x < 0) {
        left = 0
      } else if (x > 240) {
        left = 240
      } else {
        left = x
      }
      // 同步移动滑块和图片补丁
      this.width = left + 40
      this.blockDom.style.left = left + 'px'
    },
    // 鼠标弹起函数
    mouseupFun () {
      // 拼图是否正确
      if (Math.abs(this.width - 40 - this.blockX) < 3) {
        this.successTime = parseFloat(
          ((new Date() - this.beginDate) / 1000).toFixed(3)
        )
        this.statusClass = 'sliding-validation-block-success'
        this.success = true
        setTimeout(() => {
          this.success = false
          this.handleClose(true)
          this.statusClass = ''
          this.width = 40
          this.blockDom.style.left = 0 + 'px'
          this.hint = true
          this.successTime = 0
          this.failure = 0
        }, 1000)
      } else {
        this.failure++
        this.error = true
        this.statusClass = 'sliding-validation-block-error'
        setTimeout(() => {
          this.statusClass = 'sliding-validation-block-restore'
          this.width = 40
          this.blockDom.classList.add('block-canvas-restore')
          this.blockDom.style.left = 0 + 'px'
          this.hover = false
        }, 500)
        setTimeout(() => {
          this.statusClass = ''
          this.blockDom.classList.remove('block-canvas-restore')
          this.error = false
          this.hint = true
          if (this.failure > 1) {
            this.failure = 0
            this.initCanvas()
          }
        }, 1000)
      }
      // 销毁事件监听
      window.removeEventListener(this.over, this.mousemoveFun, false)
      window.removeEventListener(this.over, this.mouseupFun, false)
      return false
    },
    // 刷新
    handleReload () {
      this.initCanvas()
      return false
    },
    // 关闭验证码
    handleClose () {
      this.$emit('handleSlidingValidation', { type: false, msg: '验证成功' })
      return false
    }
  }
}
</script>

<style lang="less" >
@import url("../../assets/css/iconfont.css");
@import url("../../assets/css/swipeVerification.less");
</style>
