/**
 * @description blog的接口
 * @author zr
 */
import base from './base' // 导入接口域名列表
import axios from '@/http'// 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const blog = {
  // post 获取微博列表
  getBlogList (params) {
    return axios.post(`${base.api}/blog/getBlogList`, qs.stringify(params))
  }
}

export default blog
