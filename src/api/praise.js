/**
 * @description praise 的相关接口
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const praise = {
  // 点赞
  addPraise (params) {
    return axios.post(`${base.api}/praise/addPraise`, qs.stringify(params))
  },
  // 取消点赞
  unPraise (params) {
    return axios.post(`${base.api}/praise/unPraise`, qs.stringify(params))
  },
  // 获取点赞用户的列表
  getPraiseUser (params) {
    return axios.post(`${base.api}/praise/getPraise`, qs.stringify(params))
  }
}

export default praise
