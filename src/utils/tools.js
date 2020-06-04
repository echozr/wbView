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
  }
}

export default _tools
