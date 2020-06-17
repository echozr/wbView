/**
 * @description 评论的相关接口
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const discuss = {
  // 添加评论
  addDiscuss (params) {
    return axios.post(`${base.api}/discuss/addDiscuss`, qs.stringify(params))
  },
  // 根据博客ID 获取评论列表
  getDiscussList (params) {
    return axios.post(`${base.api}/discuss/getDiscussList`, qs.stringify(params))
  }
}

export default discuss
