// src/services/index.js
import request from '@utils/request'
import Project from './project'
import Resource from './resource'

/**
 * 登录
 */
export const login = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'gologin',
    ...params
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'get_user_info',
    ...params
  })
}

/**
 * 获取Token
 */
export const getToken = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'get_token',
    ...params
  })
}

/**
 * 默认输出
 */
export default {
  login,
  getUserInfo,
  getToken,
  ...Project,
  ...Resource
}
