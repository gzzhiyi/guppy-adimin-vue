<template>
  <div class="sidebar-menu-shrink">
    <template v-for="(item, index) in menuList">
      <div class="sidebar-menu-shrink-item" :key="index">
        <Dropdown
          transfer v-if="item.children.length !== 1"
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <Button class="sidebar-menu-shrink-btn" type="text">
            <Icon :size="20" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.name" :key="i">
                <Icon :type="child.icon"></Icon>
                <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
          <Button
            class="sidebar-menu-shrink-btn"
            @click="changeMenu(item.children[0].name)"
            type="text"
          >
            <Icon :size="20" :type="item.children[0].icon || item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.children[0].name" :key="'d' + index">
              <Icon :type="item.children[0].icon || item.icon"></Icon>
              <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'sidebarMenuShrink',
    props: {
      menuList: {
        type: Array
      }
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
  .sidebar-menu-shrink-item {
    text-align: left;
  }
  .sidebar-menu-shrink-btn {
    width: 59px;
    height: auto;
    padding: 10px 0;
  }
</style>
