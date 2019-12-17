<template>
  <div
    class="logo"
    :class="shrink && 'logo--shrink'"
  >
    <img v-show="!shrink" src="https://www.huolala.cn/rs/img/img_nav_logo.png" />
    <img v-show="shrink" src="../../assets/images/logo_min.png" />
  </div>
</template>

<script>
  export default {
    props: {
      shrink: false
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/styles/common.less";

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    img {
      width: auto;
      height: 44px;
      vertical-align: top;
    }
  }
</style>