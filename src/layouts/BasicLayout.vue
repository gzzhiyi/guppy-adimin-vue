<template>
  <div class="main">
    <!-- Sidebar -->
    <div class="main__sidebar">
      <sidebar
        :shrink="shrink"
        :before-push="onBeforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
        @on-change="onSubmenuChange"
      >
        <div class="main__logo" slot="top">
          <img v-show="!shrink" src="https://www.huolala.cn/rs/img/img_nav_logo.png" key="max-logo" />
          <img v-show="shrink" src="../assets/images/logo_min.png" key="min-logo" />
        </div>
      </sidebar>
    </div>

    <!-- Header -->
    <div
      class="main__header"
      :class="shrink && 'main__header--shrink'"
    >
      <!-- Header Top -->
      <div class="main__header__top">
        <Button
          class="sidebar-btn"
          :class="shrink && 'sidebar-btn--shrink'"
          type="text"
          @click="handleToggleClick"
        >
          <Icon type="md-menu" size="24" />
        </Button>
        <div class="breadcrumb">
          <breadcrumb-nav :currentPath="currentPath" />
        </div>
        <div class="user-info">
          <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
            <span class="user-info__name" v-text="userName" />
            <DropdownMenu slot="list">
              <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Avatar class="user-info__avatar" :src="avatorPath"></Avatar>
        </div>
      </div>
      <!-- Header Tips -->
      <div class="main__header__tags">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>

    <!-- Content -->
    <div
      class="main__content"
      :class="shrink && 'main__content--shrink'"
    >
      <keep-alive :include="cachePage">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import sidebar from './components/sidebar/Sidebar.vue'
  import tagsPageOpened from './components/TagsPageOpened.vue'
  import breadcrumbNav from './components/BreadcrumbNav.vue'
  import { setCurrentPath, openNewPage } from '@utils'
  import { getUserInfo as fetchGetUserInfo } from '@services/accounts'

  export default {
    components: {
      sidebar,
      tagsPageOpened,
      breadcrumbNav
    },
    data () {
      return {
        shrink: false,
        userName: '',
        openedSubmenuArr: this.$store.state.app.openedSubmenuArr
      }
    },
    watch: {
      '$route' (to) {
        this.$store.commit('setCurrentPageName', to.name)
        const pathArr = setCurrentPath(this, to.name)
        if (pathArr.length > 2) {
          this.$store.commit('addOpenSubmenu', pathArr[1].name)
        }
        this.checkTag(to.name)
        localStorage.currentPageName = to.name
      }
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      },
      pageTagsList () {
        return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
      },
      currentPath () {
        return this.$store.state.app.currentPath // 当前面包屑数组
      },
      avatorPath () {
        return this.$store.state.app.avatorImgPath || require('../assets/images/avatar@2x.png')
      },
      cachePage () {
        return this.$store.state.app.cachePage
      }
    },
    async created () {
      const pathArr = setCurrentPath(this, this.$route.name)
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.getUserInfo() // 获取用户信息
    },
    methods: {
      /**
       * 点击用户下拉菜单
       * @param {!string} name - 选项名称
       */
      handleClickUserDropdown (name) {
        if (name === 'userCenter') {
          openNewPage(this, 'userCenter_index')
          this.$router.push({ name: 'userCenter_index' })
        } else if (name === 'logout') {
          this.logout()
        }
      },
      /**
       * 侧栏菜单缩放
       */
      handleToggleClick () {
        this.shrink = !this.shrink
      },
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
       * 菜单跳转前钩子函数
       */
      onBeforePush (name) {
        return true
      },
      /**
       * 切换子菜单钩子
       */
      onSubmenuChange (val) {},
      checkTag (name) {
        const openpageHasTag = this.pageTagsList.some(item => {
          if (item.name === name) {
            return true
          }
        })
        if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
          openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
        }
      },
      /**
       * 退出登录
       */
      logout () {
        this.$store.commit('logout')
        this.$store.commit('clearOpenedSubmenu')
        this.$store.commit('clearAllTags')
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    &__sidebar {
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      height: 100%;
      transition: width @transition-time;
    }
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      img {
        width: auto;
        height: 44px;
        vertical-align: top;
      }
    }
    &__header {
      padding-left: 200px;
      &--shrink {
        padding-left: 60px;
      }
    }
    &__header__top {
      display: flex;
      align-items: center;
      position: relative;
      height: 60px;
      .sidebar-btn {
        height: 100%;
        transform: rotateZ(0deg);
        &--shrink {
          transform: rotateZ(-90deg);
        }
      }
      .breadcrumb {
        padding: 0 @spacing-base;
      }
      .user-info {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        padding-right: @spacing-base;
        cursor: pointer;
        .user-info__avatar {
          margin-left: @spacing-base;
        }
        .user-info__name {
          display: inline-block;
          width: 80px;
          color: #1890ff;
          text-overflow: ellipsis;
          text-align: right;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    &__header__tags {
      height: 40px;
      padding: 0 @spacing-base;
      overflow: hidden;
    }
    &__content {
      position: absolute;
      z-index: 1;
      top: 101px;
      left: 200px;
      right: 0;
      bottom: 0;
      overflow: auto;
      transition: left @animation-time;
      &--shrink {
        left: 60px;
      }
    }
  }
</style>