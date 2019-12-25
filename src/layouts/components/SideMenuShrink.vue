<template>
  <div class="sidebar-menu-shrink">
    <template v-for="(item, index) in menuList">
      <div
        :key="index"
        class="sidebar-menu-shrink-item"
      >
        <Dropdown
          v-if="item.children.length !== 1"
          placement="right-start"
          transfer
          @on-click="changeMenu"
        >
          <Button
            class="sidebar-menu-shrink-btn"
            type="text"
          >
            <Icon
              :size="20"
              :type="item.icon"
            />
          </Button>
          <DropdownMenu
            class="dropdown-menu"
            slot="list"
          >
            <template v-for="(child, i) in item.children">
              <DropdownItem
                :name="child.name"
                :key="i"
              >
                <Icon :type="child.icon" />
                <span class="dropdown-menu__text">
                  {{ itemTitle(child) }}
                </span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          v-else
          transfer
          placement="right-start"
          @on-click="changeMenu"
        >
          <Button
            class="sidebar-menu-shrink-btn"
            @click="changeMenu(item.children[0].name)"
            type="text"
          >
            <Icon
              :size="20"
              :type="item.children[0].icon || item.icon"
            />
          </Button>
          <DropdownMenu
            class="dropdown-menu"
            slot="list"
          >
            <DropdownItem :name="item.children[0].name">
              <Icon :type="item.children[0].icon || item.icon"></Icon>
              <span class="dropdown-menu__text">
                {{ itemTitle(item.children[0]) }}
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
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
  @import (reference) "../../assets/styles/common.less";

  .sidebar-menu-shrink {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 60px;
    overflow: auto;
    &-item {
      text-align: left;
    }
    &-btn {
      width: 60px;
      height: auto;
      padding: 10px 0;
      color: @siderbar-color !important;
      border-radius: 0;
      &:hover {
        color: @siderbar-color-selected !important;
        background-color: #555 !important;
      }
    }
  }

  .dropdown-menu {
    width: 200px;
    &__text {
      padding-left: 10px;
    }
  }
</style>
