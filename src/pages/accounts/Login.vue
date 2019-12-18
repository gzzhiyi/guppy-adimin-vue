<template>
  <div class="page">
    <div class="login">
      <div class="login__logo" />
      <div class="login__slogo">
        欢迎使用 GuppyAdmin！
      </div>

      <Form
        :model="form"
        :rules="rules"
        :label-width="0"
        ref="loginForm"
      >
        <FormItem prop="userName">
          <Input
            v-model="form.userName"
            type="text"
            placeholder="用户名"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="form.password"
            type="password"
            placeholder="密码"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            long
            @click="handleLogin"
          >
            登录
          </Button>
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
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /**
       * 点击去登录
       */
      handleLogin () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$router.replace({
              name: 'dashboard'
            })
          } else {
            this.$Message.error('登录失败')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    height: 100%;
    padding-top: 10%;
    background-color: #f8f8f8;
    box-sizing: border-box;
  }
  .login {
    width: 320px;
    margin: 0 auto;
    &__logo {
      width: 140px;
      height: 50px;
      margin: 50px auto 10px;
      background: url('https://www.huolala.cn/rs/img/img_nav_logo.png') no-repeat;
      background-size: 100%;
    }
    &__slogo {
      margin-bottom: 30px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
