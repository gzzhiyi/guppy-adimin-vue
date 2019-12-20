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
        logo: '',
        minLogo: ''
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
