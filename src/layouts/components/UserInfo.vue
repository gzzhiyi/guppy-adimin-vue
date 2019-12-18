<template>
  <Dropdown
    :class="shrink && 'user-info--shrink'"
    class="user-info"
    transfer
    placement="right"
    trigger="click"
    @on-click="handleClickUserDropdown"
  >
    <Avatar
      :src="avatorPath"
      class="user-info__avatar"
      size="40"
    />
    <div
      v-show="!shrink"
      v-text="userName"
      class="user-info__name"
    />
    <DropdownMenu slot="list">
      <DropdownItem name="logout">退出登录</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  import { getUserInfo as fetchGetUserInfo } from '@services/accounts'

  export default {
    props: {
      shrink: false
    },
    data () {
      return {
        userName: ''
      }
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      },
      currentPath () {
        return this.$store.state.app.currentPath // 当前面包屑数组
      },
      avatorPath () {
        return this.$store.state.app.avatorImgPath || require('../../assets/images/avatar@2x.png')
      }
    },
    created () {
      this.getUserInfo() // 获取用户信息
    },
    methods: {
      /**
       * 获取用户信息
       */
      async getUserInfo () {
        this.userName = this.$store.state.user.userName
        try {
          const res = await fetchGetUserInfo()
          if (res.ret === 0) {
            const { id, account, name, is_admin: isAdmin } = res.data
            this.$store.commit('setUserId', id)
            this.$store.commit('setUserName', account)
            this.$store.commit('setRealName', name)
            this.userName = account
            const permissionList = []
            isAdmin === 1 && permissionList.push('admin')
            this.$store.commit('setPermissionList', permissionList) // 设置权限列表
            this.$store.commit('updateMenulist') // 权限菜单过滤相关
          }
        } catch (err) {
          console.error(err)
        }
      },
      /**
       * 点击用户下拉菜单
       * @param {!string} name - 选项名称
       */
      handleClickUserDropdown (name) {
        if (name === 'userCenter') {
          this.$router.push({ name: 'userCenter_index' })
        } else if (name === 'logout') {
          this.logout()
        }
      },
      /**
       * 退出登录
       */
      logout () {
        this.$store.commit('logout')
        this.$store.commit('clearOpenedSubmenu')
        this.$router.replace({ name: 'login' })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/styles/common.less";

  .user-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }
    &__avatar {
      margin: @spacing-base;
    }
    &__name {
      display: inline-flex;
      width: 120px;
      color: #1890ff;
      text-overflow: ellipsis;
      text-align: right;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>