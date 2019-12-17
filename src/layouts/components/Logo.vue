<template>
  <div
    class="logo"
    :class="shrink && 'logo--shrink'"
  >
    <img :src="!shrink ? logo : minLogo" />
  </div>
</template>

<script>
  export default {
    props: {
      shrink: false
    },
    data () {
      return {
        logo: 'https://www.huolala.cn/rs/img/img_nav_logo.png',
        minLogo: require('../../assets/images/logo_min.png')
      }
    }
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
