/**
 * @description follower 的相关接口
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const follower = {
  // 根据用户ID获取粉丝数
  getFansAndFollower (params) {
    return axios.post(`${base.api}/follow/getFansAndFollower`, qs.stringify(params))
  }
}

export default follower
