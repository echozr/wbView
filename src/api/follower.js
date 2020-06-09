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
  },
  // 根据登录的用户获取关注列表
  getFollower () {
    return axios.post(`${base.api}/follow/getFollowerList`)
  },
  // 根据登录用户获取粉丝列表
  getFans () {
    return axios.post(`${base.api}/follow/getFansList`)
  },
  // 取消关注
  unFollow (params) {
    return axios.post(`${base.api}/follow/unFollow`, qs.stringify(params))
  },
  // 添加关注
  addFollow (params) {
    return axios.post(`${base.api}/follow/addFollow`, qs.stringify(params))
  },
  // 判断用户是否关注某人
  isFollow (params) {
    return axios.post(`${base.api}/follow/isFollow`, qs.stringify(params))
  }
}

export default follower
