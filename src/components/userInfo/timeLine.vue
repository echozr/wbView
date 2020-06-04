<template>
  <div class="time">
    <ul class="time-line">
      <li v-for="(item, index) in imageList" class="time-line-div" :key="index">
        <p>{{item.time}}</p>
        <p ref="circular"></p>
        <div class="imgwarp">
           <ul class="blogImgWarp row" v-if="item.list.length>0">
              <li v-for="(item1,index1) in item.list" :key="index1">
                <van-image width="21vw" height="21vw" Lazy-Load :src="item1.image" @click.stop="HandleclickImg(index1,item.list)" />
              </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Image as VanImage, ImagePreview } from 'vant'
export default {
  name: 'timeLine',
  props: {
    imageList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    HandleclickImg (index, list) {
      const imgList = list.map(v => v.image)
      ImagePreview({
        images: imgList,
        startPosition: index
      })
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [ImagePreview.name]: ImagePreview
  }
}
</script>
<style lang="less" scoped>
.time {
  padding: 5vw 0;

  .time-line {
    position: relative;
    width: 92vw;
    margin: 0 auto;
    .time-line-div {
      position: relative;
      p:nth-child(1) {
        position: absolute;
        left: 0;
        width: 15vw;
        font-size: 4vw;
        padding: 10px 0;
        text-align: center;
      }
      p:nth-child(2) {
        position: absolute;
        left: 17.5vw;
        width: 5vw;
        height: 5vw;
        top: 10px;
        background: #5cb85c;
        border-radius: 50%;
        z-index: 10;
      }
      .imgwarp {
          margin-left: 20vw;
          flex: 1;
          width: 67vw;
          padding-left: 5vw;
          border-left: 1px #afabab dashed;
          padding-bottom: 10px;
          li{
            width: 21vw;
            height: 21vw;
            flex: 0 0 21vw;
            margin: 0.5vw;
          }
      }
    }
  }
}
</style>
