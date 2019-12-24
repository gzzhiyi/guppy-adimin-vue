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
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .search-panel {
    margin-bottom: @spacing-base;
    padding: @spacing-base;
    background-color: #f7f7f7;
  }
</style>
