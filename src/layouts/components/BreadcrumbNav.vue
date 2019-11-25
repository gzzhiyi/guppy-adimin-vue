<template>
  <Breadcrumb>
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

