<template>
  <div class="center">
    <div class="center__info">
      <Avatar
        :src="avatorPath"
        size="60"
      />
      <p class="center__name">Stanley.he</p>
      <p>技术中心</p>
    </div>
    <Form
      :label-width="80"
      label-colon
    >
      <FormItem label="工号">
        NO02304
      </FormItem>
      <FormItem label="邮箱">
        xxx@mail.com
      </FormItem>
      <FormItem label="职务">
        前端开发
      </FormItem>
      <FormItem label="介绍">
        我是一名前端开发程序员
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          ghost
          @click="handleEdit"
        >
          <Icon type="md-checkbox-outline" /> 修改
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data () {
      return {
        avatorPath: require('../../assets/images/avatar@2x.png')
      }
    },
    methods: {
      handleEdit () {
        this.$router.push({ name: 'settings' })
      }
    }
  }
</script>

<style lang="less" scoped>
  .center {
    width: 320px;
    margin: 5% auto;
    padding: 20px 0;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    &__info {
      padding: 20px 0;
      text-align: center;
    }
    &__name {
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
    p {
      text-align: center;
    }
  }
</style>
