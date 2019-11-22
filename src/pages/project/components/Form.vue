<template>
  <Modal
    v-model="visible"
    :title="status === 'add' ? '添加项目' : '修改项目'"
    :loading="loading"
    :closable="false"
    :mask-closable="false"
  >
    <Form ref="form" :model="formData" :label-width="150" :show-message="false">
      <FormItem label="项目名称" prop="name" required>
        <Input type="text" v-model="formData.name" placeholder="请输入项目名称" :disabled="status !== 'add'" />
      </FormItem>
      <FormItem label="部门ID" prop="depId" required>
        <Select v-model="formData.depId">
          <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="存储空间名称" prop="bucket" required>
        <Input type="text" v-model="formData.bucket" placeholder="请输入存储空间名称" />
      </FormItem>
      <FormItem label="Access Key Id" prop="keyId" required>
        <Input type="text" v-model="formData.keyId" placeholder="请输入Access Key Id" />
      </FormItem>
      <FormItem label="Access Key Secret" prop="keySecret">
        <Input type="text" v-model="formData.keySecret" placeholder="请输入Access Key Secret" />
      </FormItem>
    </Form>
    <ButtonGroup slot="footer">
      <Button size="large" @click="handleCancel">取消</Button>
      <Button size="large" :disabled="btnDisabled" type="primary" @click="handleSubmit">提交</Button>
    </ButtonGroup>
  </Modal>
</template>

<script>
  import Services from 'services'

  export default {
    components: {},
    props: {
      status: String,
      data: Object,
      departmentList: Array
    },
    data () {
      return {
        visible: false,
        loading: true,
        btnDisabled: false,
        formData: {}
      }
    },
    watch: {
      data: {
        handler (val) {
          this.formData = val
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.status === 'edit' ? this.edit() : this.add()
          } else {
            this.$Message.error('请填写完整内容！')
          }
        })
      },
      handleCancel () {
        this.visible = false
        this.$refs.form.resetFields()
      },
      show () {
        this.visible = true
      },
      hide () {
        this.visible = false
      },
      async add () {
        this.btnDisabled = true
        try {
          const { name, depId, bucket, keyId, keySecret } = this.formData
          const res = await Services.addProject({
            proj_name: name,
            department_id: depId,
            domain: `https://${bucket}.oss-cn-shenzhen.aliyuncs.com/`,
            bucket,
            access_key_id: keyId,
            access_key_secret: keySecret
          })
          if (res.ret === 0) {
            this.$emit('on-saved')
            this.reset()
          } else {
            this.btnDisabled = false
          }
        } catch (err) {
          console.error(err)
          this.btnDisabled = false
        }
      },
      async edit () {
        this.btnDisabled = true
        try {
          const { id, depId, bucket, keyId, keySecret } = this.formData
          const res = await Services.updateProject({
            proj_id: id,
            department_id: depId,
            domain: `https://${bucket}.oss-cn-shenzhen.aliyuncs.com/`,
            bucket,
            access_key_id: keyId,
            access_key_secret: keySecret
          })
          if (res.ret === 0) {
            this.$emit('on-saved')
            this.reset()
          } else {
            this.btnDisabled = false
          }
        } catch (err) {
          console.error(err)
          this.btnDisabled = false
        }
      },
      reset () {
        this.visible = false
        this.btnDisabled = false
        this.formData = {}
        this.$refs.form.resetFields()
      }
    }
  }
</script>