/**
 * @description user模块接口列表
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const user = {
  // post提交 login
  login (params) {
    return axios.post(`${base.api}/user/login`, qs.stringify(params))
  },
  // 注册
  register (params) {
    return axios.post(`${base.api}/user/register`, qs.stringify(params))
  },
  // 验证用户是否已注册
  isExist (params) {
    return axios.post(`${base.api}/user/isExist`, qs.stringify(params))
  },
  // 修改用户信息
  changeInfo (params) {
    return axios.post(`${base.api}/user/changeInfo`, qs.stringify(params))
  },
  // 修改密码
  changePassword (params) {
    return axios.post(`${base.api}/user/changePassword`, qs.stringify(params))
  },
  // 根据用户名获取用户信息
  getUserInfo (params) {
    return axios.post(`${base.api}/user/getUserInfo`, qs.stringify(params))
  },
  // 退出
  logout () {
    return axios.post(`${base.api}/user/logout`)
  }
}

export default user
