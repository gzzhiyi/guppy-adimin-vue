<template>
  <Container>
    <Content>
      <Form
        :label-width="80"
        :model="form"
        :rules="rules"
        class="form"
        ref="form"
      >
        <FormItem
          label="用户名"
          prop="userName"
        >
          <Input
            v-model="form.userName"
            type="text"
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem
          label="密码"
          prop="password"
        >
          <Input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem
          label="邮箱"
          prop="email"
        >
          <Input
            v-model="form.email"
            type="text"
            placeholder="请输入邮箱"
          />
        </FormItem>
        <FormItem
          label="介绍"
          prop="desc"
        >
          <Input
            v-model="form.desc"
            type="text"
            placeholder="请输入介绍"
          />
        </FormItem>
        <FormItem>
          <Button type="primary">修改</Button>
        </FormItem>
      </Form>
    </Content>
  </Container>
</template>

<script>
  import Container from '@components/Container'
  import Content from '@components/Content'

  export default {
    components: {
      Container,
      Content
    },
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
            this.$router.replace({ name: 'dashboard' })
          } else {
            this.$Message.error('登录失败')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .form {
    max-width: 600px;
    margin: 5% auto;
  }
</style>
