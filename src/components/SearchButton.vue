<template>
  <div
    v-show="visible"
    class="search-panel"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/themes/default/common.less";

  .search-panel {
    margin-bottom: @spacing-base;
    padding: @spacing-base;
    background-color: #f8f8f8;
  }
</style>