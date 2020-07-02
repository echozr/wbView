/**
 * @description util 工具模块
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const util = {
  // 上传附件
  upload (params) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const param = new FormData()// 创建form对象
    param.append('file', params)
    return axios.post(`${base.api}/utils/upload`, param, config)
  },
  // 获取所有@的数量
  getAllAtCount (params) {
    return axios.post(`${base.api}/atRelation/getAllAtCount`, qs.stringify(params))
  },
  // 未读改成已读
  changeRead (params) {
    return axios.post(`${base.api}/atRelation/changeRead`, qs.stringify(params))
  },
  // 获取@未读的博客列表
  getAtBlog (params) {
    return axios.post(`${base.api}/atRelation/getAtBlog`, qs.stringify(params))
  },
  // 获取@未读评论列表
  getAtDiscuss (params) {
    return axios.post(`${base.api}/atRelation/getAtDiscuss`, qs.stringify(params))
  }
}

export default util
