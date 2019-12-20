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
    padding: @spacing-large;
    background-color: #fff;
    border-radius: @border-radius-small;
    box-shadow: 0 0 35px 0 rgba(0, 0, 0, .05);
  }
</style>
