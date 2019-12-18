import { otherRouter, appRouter } from '@/router/routerConfig'
import { getMenuByPermission } from '@utils'

const defaultRoute = [{
  title: '首页',
  path: '/dashboard',
  name: 'dashboard'
}]

export default {
  state: {
    cachePage: [], // 缓存页面
    openedSubmenuArr: [], // 要展开的菜单数组
    currentPageName: '', // 当前页面名称
    currentPath: defaultRoute, // 当前页面路径
    permissionList: [], // 权限列表
    menuList: [], // 菜单列表
    routers: [ // 路由
      otherRouter,
      ...appRouter
    ]
  },
  mutations: {
    /**
     * 设置权限列表
     * @param {!Object} state
     * @param {!Object|!Object[]} list
     */
    setPermissionList (state, list) {
      state.permissionList = list
    },
    /**
     * 更新菜单列表
     * @param {!Object} state
     */
    updateMenulist (state) {
      let menuList = []
      const permissionList = state.permissionList
      appRouter.forEach((item, index) => {
        const children = item.children
        let arr = []
        if (children && children.length) {
          arr = getMenuByPermission(children, permissionList)
          item.children = arr
        }
        if (item.access) {
          menuList.push(item)
        } else {
          arr.length && menuList.push(item)
        }
      })
      state.menuList = menuList
    },
    /**
     * 添加子菜单
     * @param {!Object} state
     * @param {string} name - 菜单名称
     */
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    /**
     * 初始化缓存页面
     * @param {!Object} state
     */
    initCachepage (state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage)
      }
    },
    /**
     * 设置当前路径
     * @param {!Object} state
     * @param {!Object[]} pathArr
     */
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    /**
     * 设置当前页面名称
     * @param {!Object} state
     * @param {!string} name
     */
    setCurrentPageName (state, name) {
      state.currentPageName = name
    },
    /**
     * 清空已打开子菜单
     * @param {!Object} state
     */
    clearOpenedSubmenu (state) {
      state.openedSubmenuArr.length = 0
    }
  }
}
