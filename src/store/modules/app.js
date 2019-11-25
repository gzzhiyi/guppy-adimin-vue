import { otherRouter, appRouter } from '@/router/router'
import { getMenuByPermission, oneOf } from '@utils'

const defaultRoute = [{
  title: '首页',
  path: '',
  name: 'home'
}]

export default {
  state: {
    cachePage: [], // 缓存页面
    isFullScreen: false, // 是否全屏显示
    openedSubmenuArr: [], // 要展开的菜单数组
    pageOpenedList: defaultRoute, // 已打开页面
    currentPageName: '', // 当前页面名称
    currentPath: defaultRoute, // 当前页面路径
    permissionList: [], // 权限列表
    menuList: [], // 菜单列表
    routers: [ // 路由
      otherRouter,
      ...appRouter
    ],
    tagsList: [...otherRouter.children], // 页标签
    dontCache: [''] // 在这里定义你不想要缓存的页面的name属性值
  },
  mutations: {
    /**
     * 设置tagsList内容
     * @param {!Object} state
     * @param {!Object|!Object[]} list
     */
    setTagsList (state, list) {
      state.tagsList.push(...list)
    },
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
     * 通过菜单名称关闭页面
     * @param {!Object} state
     * @param {!string} name
     */
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
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
     * 已打开页面列表
     * @param {!Object} state
     * @param {!Object} get
     */
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
     * 移除Tag
     * @param {!Object} state
     * @param {!string} name
     */
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    /**
     * 创建标签
     * @param {!Object} state
     * @param {!Object} tagObj
     */
    increateTag (state, tagObj) {
      if (!oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name)
        localStorage.cachePage = JSON.stringify(state.cachePage)
      }
      state.pageOpenedList.push(tagObj)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
     * 清空Tag，关闭所有标签
     * @param {!Object} state
     */
    clearAllTags (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
     * 清空Tag，清空其它标签
     * @param {!Object} state
     * @param {!Object} vm
     */
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
     * 设置已打开列表
     * @param {!Object} state
     */
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
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
