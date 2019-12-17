<template>
  <div class="main">
    <!-- Sidebar -->
    <div
      class="main__sidebar"
      :class="shrink && 'main__sidebar--shrink'"
    >
      <Logo :shrink="shrink" />
      <SideMenu
        :shrink="shrink"
        :before-push="onBeforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
        @on-change="onSubmenuChange"
      />
      <UserInfo :shrink="shrink" />
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
          <BreadcrumbNav :currentPath="currentPath" />
        </div>
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
  import Logo from './components/Logo'
  import SideMenu from './components/sidebar/Sidebar.vue'
  import UserInfo from './components/UserInfo.vue'
  import BreadcrumbNav from './components/BreadcrumbNav.vue'
  import { setCurrentPath, openNewPage } from '@utils'

  export default {
    components: {
      SideMenu,
      BreadcrumbNav,
      Logo,
      UserInfo
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
      cachePage () {
        return this.$store.state.app.cachePage
      }
    },
    async created () {
      const pathArr = setCurrentPath(this, this.$route.name)
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
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
      display: flex;
      flex-direction: column;
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      height: 100%;
      transition: width @transition-time;
      &--shrink {
        width: 60px;
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
    }
    &__header__tags {
      height: 32px;
      overflow: hidden;
    }
    &__content {
      position: absolute;
      z-index: 1;
      top: 60px;
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