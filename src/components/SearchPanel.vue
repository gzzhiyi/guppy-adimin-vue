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
      visible: true
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .search-panel {}
</style>
