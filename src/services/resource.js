// src/libs/apis/resource.js
import request from '@/utils/request'

/**
 * 资源列表
 */
export const getResourceList = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'source_list',
    ...params
  })
}

/**
 * 上传资源
 */
export const uploadResource = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'source_upload',
    ...params
  })
}

export default {
  getResourceList,
  uploadResource
}
