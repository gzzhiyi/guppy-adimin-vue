// src/libs/apis/project.js
import request from '@/utils/request'

/**
 * 添加项目
 */
export const addProject = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'proj_add',
    ...params
  })
}

/**
 * 修改项目
 */
export const updateProject = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'proj_update',
    ...params
  })
}

/**
 * 项目列表
 */
export const getProjectList = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'proj_list',
    ...params
  })
}

/**
 * 部门列表
 */
export const getDepartmentList = (params = {}) => {
  return request('post', '/index.php', {
    _m: 'get_my_depart_list',
    ...params
  })
}

export default {
  addProject,
  updateProject,
  getProjectList,
  getDepartmentList
}
