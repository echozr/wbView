/**
 * user模块接口列表
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

console.log(axios)
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
  }
}

export default user
