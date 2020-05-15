/**
 * @description api接口的统一出口
 * @author zr
 */
// 用户模块接口
import user from '@/api/user'
// 工具接口
import util from '@/api/util'
// blog 接口
import blog from '@/api/blog'

// 导出接口
export default {
  user,
  util,
  blog
}
