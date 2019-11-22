import Cookies from 'js-cookie'

export default {
  state: {
    token: '',
    userId: '',
    userName: '',
    realName: ''
  },
  mutations: {
    /**
     * 设置Token值
     * @param {!Object} state
     * @param {!string} token
     */
    setToken (state, token) {
      state.token = token || ''
      Cookies.set('userToken', token)
    },
    /**
     * 设置用户ID
     * @param {!Object} state
     * @param {!string} id
     */
    setUserId (state, id) {
      state.userId = id || ''
      Cookies.set('userId', id)
    },
    /**
     * 设置用户名
     * @param {!Object} state
     * @param {!string} name
     */
    setUserName (state, name) {
      state.userName = name || ''
      Cookies.set('userName', name)
    },
    /**
     * 设置真实姓名
     * @param {!Object} state
     * @param {!string} name
     */
    setRealName (state, name) {
      state.realName = name || ''
      Cookies.set('realName', name)
    },
    /**
     * 用户退出
     */
    logout (state) {
      localStorage.removeItem('isLoginBack')
      localStorage.removeItem('cachePage')
      localStorage.removeItem('pageOpenedList')
      localStorage.removeItem('currentPageName')

      state.token = ''
      state.userId = ''
      state.userName = ''
      state.realName = ''
      Cookies.remove('userToken')
      Cookies.remove('userId')
      Cookies.remove('userName')
      Cookies.remove('realName')
    }
  }
}
