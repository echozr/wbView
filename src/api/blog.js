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
  },
  // 创建微博
  creatBlog (params) {
    return axios.post(`${base.api}/blog/creatBlog`, qs.stringify(params))
  },
  // 根据用户获取附件图片
  getUploadByUser (params) {
    return axios.post(`${base.api}/blog/getUploadByUser`, qs.stringify(params))
  },
  // 根据blogId获取微博
  getBlogItem (params) {
    return axios.post(`${base.api}/blog/getBlogInfo`, qs.stringify(params))
  },
  // 根据微博ID删除微博
  deleteBlog (params) {
    return axios.post(`${base.api}/blog/deleteBlog`, qs.stringify(params))
  }
}

export default blog
