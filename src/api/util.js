/**
 * @description util 工具模块
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const util = {
  // 上传附件
  upload (params) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const param = new FormData()// 创建form对象
    param.append('file', params)
    return axios.post(`${base.api}/utils/upload`, param, config)
  }
}

export default util
