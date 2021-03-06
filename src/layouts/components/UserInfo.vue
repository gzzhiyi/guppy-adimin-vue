<template>
  <Dropdown
    :class="shrink && 'user-info--shrink'"
    class="user-info"
    transfer
    placement="bottom"
    trigger="click"
    @on-click="handleClickUserDropdown"
  >
    <Avatar
      :src="avatorPath"
      class="user-info__avatar"
      size="36"
    />
    <div
      v-show="!shrink"
      v-text="userName"
      class="user-info__name"
    />
    <DropdownMenu slot="list">
      <DropdownItem name="center">个人中心</DropdownItem>
      <DropdownItem name="settings">个人设置</DropdownItem>
      <DropdownItem name="logout">退出登录</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  import { getUserInfo as fetchGetUserInfo } from '@services'

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
        return this.$store.state.app.avatorImgPath || ''
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
          if (res.status === 0) {
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
        switch (name) {
          case 'center':
            this.$router.push({ name: 'user_center' })
            break
          case 'settings':
            this.$router.push({ name: 'settings' })
            break
          case 'logout':
            this.logout()
            break
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
    position: absolute;
    top: 0;
    right: 0;
    height: 70px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }
    &__avatar {
      margin: @spacing-base;
    }
    &__name {
      display: inline-flex;
      width: 100px;
      font-weight: bold;
      text-overflow: ellipsis;
      text-align: right;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>