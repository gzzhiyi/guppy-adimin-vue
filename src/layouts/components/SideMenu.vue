<template>
  <Menu
    class="side-menu"
    ref="sidebarMenu"
    :active-name="$route.name"
    :open-names="openNames"
    width="auto"
    @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <MenuItem
        v-if="item.children.length <= 1"
        :name="item.children[0].name"
        :key="'menuitem' + item.name"
      >
        <Icon
          :type="item.children[0].icon || item.icon"
          :size="iconSize"
          :key="'menuicon' + item.name"
        >
        </Icon>
        <span
          class="layout-text"
          :key="'title' + item.name"
        >
          {{ itemTitle(item.children[0]) }}
        </span>
      </MenuItem>

      <Submenu
        v-if="item.children.length > 1"
        :name="item.name"
        :key="item.name"
      >
        <template slot="title">
          <Icon
            :type="item.icon"
            :size="iconSize"
          />
          <span class="layout-text">
            {{ itemTitle(item) }}
          </span>
        </template>
        <template v-for="child in item.children">
          <MenuItem
            :name="child.name"
            :key="'menuitem' + child.name"
          >
            <Icon
              :type="child.icon"
              :size="iconSize" :key="'icon' + child.name"
            />
            <span
              class="layout-text"
              :key="'title' + child.name"
            >
              {{ itemTitle(child) }}
            </span>
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
        const sidebarMenu = this.$refs.sidebarMenu
        if (sidebarMenu) {
          sidebarMenu.updateActiveName()
          sidebarMenu.updateOpened()
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

<style lang="less" scoped>
  .side-menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 200px;
    overflow: auto;
  }
</style>
