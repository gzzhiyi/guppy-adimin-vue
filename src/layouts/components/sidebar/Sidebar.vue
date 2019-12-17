<template>
  <div
    class="sidebar"
    :class="shrink && 'sidebar--shrink'"
  >
    <div class="menu">
      <sidebar-menu
        v-show="!shrink"
        :menu-list="menuList"
        :open-names="openNames"
        @on-change="handleChange"
      >
      </sidebar-menu>
      <sidebar-menu-shrink
        v-show="shrink"
        :menu-list="menuList"
        @on-change="handleChange"
      >
      </sidebar-menu-shrink>
    </div>
  </div>
</template>

<script>
  import sidebarMenu from './SidebarMenu.vue'
  import sidebarMenuShrink from './SidebarMenuShrink.vue'

  export default {
    components: {
      sidebarMenu,
      sidebarMenuShrink
    },
    props: {
      shrink: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        required: true
      },
      beforePush: {
        type: Function
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      handleChange (name) {
        let willpush = true
        if (this.beforePush !== undefined) {
          if (!this.beforePush(name)) {
            willpush = false
          }
        }
        if (willpush) {
          this.$router.push({
            name: name
          })
        }
        this.$emit('on-change', name)
      }
    }
  }
</script>

<style lang="less" scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 200px;
    overflow: auto;
    &--shrink {
      width: 60px;
    }
    .menu {
      flex: 1;
    }
  }
</style>