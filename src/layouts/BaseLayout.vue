<template>
  <div class="main">
    <!-- Sidebar -->
    <div
      class="sidebar"
      :class="shrink && 'sidebar--shrink'"
    >
      <!-- Logo -->
      <Logo :shrink="shrink" />

      <!-- SideMenu -->
      <SidebarMenu
        v-show="!shrink"
        :menu-list="menuList"
        :open-names="openedSubmenuArr"
        @on-change="onChange"
      />
      <SidebarMenuShrink
        v-show="shrink"
        :menu-list="menuList"
        @on-change="onChange"
      />
    </div>

    <!-- Header -->
    <div
      class="header"
      :class="shrink && 'header--shrink'"
    >
      <!-- ShrinkButton -->
      <Button
        class="shrink-btn"
        :class="shrink && 'shrink-btn--on'"
        type="text"
        @click="handleToggleClick"
      >
        <Icon type="md-menu" size="24" />
      </Button>

      <!-- Breadcrumb -->
      <BreadcrumbNav :currentPath="currentPath" />

      <!-- UserInfo -->
      <UserInfo :shrink="shrink" />
    </div>

    <!-- Content -->
    <div
      class="content"
      :class="shrink && 'content--shrink'"
    >
      <keep-alive :include="cachePage">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Logo from './components/Logo'
  import SidebarMenu from './components/SideMenu'
  import SidebarMenuShrink from './components/SideMenuShrink'
  import UserInfo from './components/UserInfo.vue'
  import BreadcrumbNav from './components/BreadcrumbNav.vue'
  import { setCurrentPath } from '@utils'

  export default {
    components: {
      SidebarMenu,
      SidebarMenuShrink,
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
        localStorage.currentPageName = to.name
      }
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
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
       * 侧栏菜单缩放
       */
      handleToggleClick () {
        this.shrink = !this.shrink
      },
      /**
       * 切换子菜单钩子
       */
      onSubmenuChange (val) {},
      onChange (name) {
        this.$router.push({ name: name })
        this.$emit('on-change', name)
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
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: @siderbar-bg-color;
    transition: width @transition-time;
    &--shrink {
      width: 60px;
    }
  }

  .header {
    display: flex;
    align-items: center;
    position: relative;
    height: 70px;
    padding-left: 200px;
    background-color: @header-bg-color;
    &--shrink {
      padding-left: 60px;
    }
    .shrink-btn {
      height: 100%;
      transform: rotateZ(0deg);
      &--on {
        transform: rotateZ(-90deg);
      }
    }
  }

  .content {
    position: absolute;
    z-index: 9;
    top: 70px;
    left: 200px;
    right: 0;
    bottom: 0;
    overflow: auto;
    transition: left @animation-time;
    &--shrink {
      left: 60px;
    }
  }
</style>
