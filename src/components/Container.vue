<template>
  <div
    class="page"
    :style="{ backgroundColor: bgColor }"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      bgColor: ''
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/common.less";

  .page {
    height: 100%;
    padding: @spacing-large;
    background-color: @page-bg-color;
    overflow: auto;
  }
</style>