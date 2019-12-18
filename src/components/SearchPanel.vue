<template>
  <div
    v-show="visible"
    class="search-panel"
  >
    <slot></slot>
    <Button
      type="error"
      @click="handleClear"
    >
      清空
    </Button>
  </div>
</template>

<script>
  export default {
    props: {
      visible: true,
      hasClearBtn: true
    },
    methods: {
      /**
       * 清空搜索内容
       */
      handleClear () {
        this.$emit('on-clear')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .search-panel {
    padding-bottom: @spacing-base;
    border-bottom: 1px @border-divider-color solid;
  }
</style>
