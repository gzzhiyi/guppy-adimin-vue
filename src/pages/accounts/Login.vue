<template>
  <div class="page">
    <div class="login">
      <Form :model="form" :label-width="80">
        <FormItem prop="user" label="用户名">
          <Input type="text" v-model="form.user" placeholder="Username" />
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="form.password" placeholder="Password" />
        </FormItem>
        <FormItem>
          <Button type="primary">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          user: '',
          password: ''
        }
      }
    },
    methods: {
      /**
       * 点击去登录
       */
      handleLogin () {}
    }
  }
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    height: 100%;
    background: #f8f8f8 url('https://sso.huolala.cn/static/images/login_bg.11a196.jpg') no-repeat;
    background-size: cover;
    background-position: center;
  }
  .login {
    width: 320px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>