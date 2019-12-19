import request from '@/utils/request'
import example from './example'

/**
 * 登录
 */
export const login = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'login',
    ...params
  })
}

export const getUserInfo = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'get_user_info',
    ...params
  })
}

export default {
  ...example
}
