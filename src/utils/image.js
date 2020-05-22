/**
 * @description 图片转换方法
 * @author zr
 */
const _image = {
  /* 将图片（路径）转换为Base64 */
  getBase64FromImageURL (url, callback) {
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      var base64URL = canvas.toDataURL('image/png')
      callback(base64URL)
      canvas = null
    }
    img.src = url
  },
  /* 将base64转换为file类型 */
  getFileFromBase64 (base64URL, filename) {
    debugger
    const arr = base64URL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
}

export default _image
