<template>
  <Breadcrumb class="breadcrumb">
    <BreadcrumbItem
      v-for="item in currentPath"
      :key="item.name"
      :href="item.path"
    >
      {{ item.title }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  export default {
    props: {
      currentPath: Array
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/styles/common.less";

  .breadcrumb {
    padding: 0 @spacing-base;
  }
</style>
