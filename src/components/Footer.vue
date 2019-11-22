<template>
  <div class="footer">
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/themes/default/common.less";

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>