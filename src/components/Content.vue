<template>
  <div class="body">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .body {
    margin-bottom: @spacing-base;
  }
</style>