import request from '@/utils/request'

export const getList = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'list',
    ...params
  })
}

export const add = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'add',
    ...params
  })
}

export const update = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'update',
    ...params
  })
}

export default {
  getList,
  add,
  update
}
