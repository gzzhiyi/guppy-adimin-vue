<template>
  <div class="error">
    <h1>404</h1>
    <h2>抱歉，你访问的页面不存在。</h2>
    <p>
      <Button
        type="primary"
        @click="handleGoHome"
      >
        返回首页
      </Button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Error404',
    methods: {
      /**
       * 返回首页
       */
      handleGoHome () {
        this.$router.replace({
          name: 'dashboard'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/styles/common.less";

  .error {
    position: absolute;
    top: 40%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    h1 {
      margin: @spacing-base 0;
      font-size: 32px;
    }
    h2 {
      font-size: 16px;
      margin: @spacing-large 0;
    }
  }
</style>
