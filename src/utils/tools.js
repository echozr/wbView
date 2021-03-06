/**
 * @description 全局公用方法
 * @author zr
 */

const _tools = {
  /**
   * 手机号验证
   */
  _isMobile () {
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag
  },
  /**
   * [groupingData 根据共同字段将数据分组]
   * @param {Array} arr [数据源]
   * @param {[string]} field [字段名]
   */
  groupingData (data, filed) {
    const map = {}
    const dest = []
    data.forEach(item => {
      if (!map[item[filed]]) {
        dest.push({
          [filed]: item[filed],
          list: [item]
        })
        map[item[filed]] = item
      } else {
        dest.forEach(dItem => {
          if (dItem[filed] === item[filed]) {
            dItem.list.push(item)
          }
        })
      }
    })
    return dest
  },
  /**
   * 用于把用utf16编码的字符转换成实体字符，以供后台存储
   * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
   * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
   */
  utf16toEntities (str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
    str = str.replace(patt, function (char) {
      var H, L, code
      if (char.length === 2) {
        H = char.charCodeAt(0) // 取出高位
        L = char.charCodeAt(1) // 取出低位
        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
        return '&#' + code + ';'
      } else {
        return char
      }
    })
    return str
  }
}

export default _tools
