<template>
  <Container>
    <Card
      class="form"
      title="添加文章"
    >
      <Form :label-width="80">
        <FormItem label="内容">
          <VueEditor v-model="content"></VueEditor>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleClick">保存</Button>
        </FormItem>
      </Form>
    </Card>
  </Container>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import Container from '@components/Container'
  import Footer from '@components/Footer'

  export default {
    components: {
      Container,
      Footer,
      VueEditor
    },
    data () {
      return {
        content: ''
      }
    },
    methods: {
      handleClick () {
        this.$Message.info(this.content)
      }
    }
  }
</script>

<style lang="less" scoped>
  .form {
    width: 640px;
    margin: 0 auto;
  }
</style>
