<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .header {
    margin-bottom: @spacing-base;
  }
</style>