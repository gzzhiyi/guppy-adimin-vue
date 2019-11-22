/**
 * 获取当前路径
 * @param {!Object} vm
 * @param {!string} name
 * @return {!Object[]} - 路径为数组格式返回
 */
export function setCurrentPath (vm, name) {
  let title = ''
  let isOtherRouter = false
  vm.$store.state.app.routers.forEach(item => {
    item.children.forEach(child => {
      if (child.name === name) {
        title = child.title
        if (item.name === 'otherRouter') {
          isOtherRouter = true
        }
      }
    })
  })
  let currentPathArr = []
  if (name === 'home') {
    currentPathArr = [{
      title: '首页',
      path: '/home',
      name: 'home'
    }]
  } else if (isOtherRouter && name !== 'home') {
    currentPathArr = [
      {
        title: '首页',
        path: '/home',
        name: 'home'
      }, {
        title,
        path: '',
        name: name
      }
    ]
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name
      } else {
        let i = 0
        let childArr = item.children
        let len = childArr.length
        while (i < len) {
          if (childArr[i].name === name) {
            return true
          }
          i++
        }
        return false
      }
    })[0]
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home'
      }]
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home'
        }, {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ]
    } else {
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name
      })[0]
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home'
        }, {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        }, {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ]
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr)
  return currentPathArr
}

/**
 * 打开新一页
 * @param {!Object}
 * @param {!string} name
 * @param {*} argu
 * @param {*} query
 */
export function openNewPage (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) {
        return name === item.children[0].name
      } else {
        return name === item.name
      }
    })
    tag = tag[0]
    if (tag) {
      tag = tag.children ? tag.children[0] : tag
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('increateTag', tag)
    }
  }
  vm.$store.commit('setCurrentPageName', name)
}

/**
 * 数组中是否包括
 * @param {*} ele
 * @param {*} targetArr
 */
export function oneOf (ele, targetArr = []) {
  return targetArr.indexOf(ele) >= 0
}

/**
 * 通过权限判断获取子菜单
 * @param {*} children
 * @param {*} permissionList
 */
export function getMenuByPermission (children, permissionList) {
  const arr = []
  children.map(child => {
    if (!child.access || oneOf(child.access, permissionList)) {
      arr.push(child)
    }
  })
  return arr
}

/**
 * 获取URL的参数
 * @return {Objects}
 */
export function getUrlParams (url) {
  if (!url) {
    url = location.href
  }
  let qs = (url.length > 0 ? url.substring(url.indexOf('?')).substr(1) : '')
  let args = {}
  let items = qs.length ? qs.split('&') : []
  let [item, name, value] = [null, null, null]
  let i = 0
  let len = items.length

  for (i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}
