<template>
  <Menu
    :active-name="$route.name"
    :open-names="openNames"
    ref="sideMenu"
    class="side-menu"
    width="auto"
    @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <MenuItem
        v-if="item.children.length <= 1"
        :key="'menuitem' + item.name"
        :name="item.children[0].name"
      >
        <Icon
          :type="item.children[0].icon || item.icon"
          :size="iconSize"
        >
        </Icon>
        <span v-text="itemTitle(item.children[0])" />
      </MenuItem>

      <Submenu
        v-if="item.children.length > 1"
        :key="item.name"
        :name="item.name"
      >
        <template slot="title">
          <Icon
            :type="item.icon"
            :size="iconSize"
          />
          <span v-text="itemTitle(item)" />
        </template>
        <template v-for="child in item.children">
          <MenuItem
            :key="child.name"
            :name="child.name"
          >
            <Icon
              :type="child.icon"
              :size="iconSize"
            />
            <span v-text="itemTitle(child)" />
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    props: {
      menuList: {
        type: Array,
        default: []
      },
      iconSize: Number,
      openNames: {
        type: Array
      }
    },
    updated () {
      this.$nextTick(() => {
        const sideMenu = this.$refs.sideMenu
        if (sideMenu) {
          sideMenu.updateActiveName()
          sideMenu.updateOpened()
        }
      })
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active)
      },
      itemTitle (item) {
        return item.title
      }
    }
  }
</script>

<style lang="less">
  @import (reference) "../../assets/styles/common.less";

  .side-menu {
    .ivu-menu-item,
    .ivu-menu-submenu {
      color: @siderbar-color !important;
    }
    .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      color: @siderbar-color-hover !important;
    }
    .ivu-menu-item {
      background-color: transparent !important;
      &:after {
        width: 0 !important;
      }
    }
    .ivu-menu-item-selected {
      color: @siderbar-color-selected !important;
      background-color: rgba(0, 0, 0, .05) !important;
    }
  }
</style>

<style lang="less" scoped>
  @import (reference) "../../assets/styles/common.less";

  .side-menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 200px;
    font-weight: bold;
    background-color: transparent;
    overflow: auto;
    &:after {
      width: 0 !important;
    }
  }
</style>
