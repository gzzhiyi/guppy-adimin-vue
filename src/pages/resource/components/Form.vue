<template>
  <Modal
    title="上传图片"
    v-model="visible"
    :loading="loading"
    :mask-closable="false"
    @on-visible-change="onClose"
  >
    <Form ref="form" :model="formData" :label-width="150" :show-message="false">
      <FormItem label="项目名称" prop="projectId">
        <Select
          v-model="formData.projectId"
          @on-change="onChange"
        >
          <Option v-for="item in projectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Upload
          v-if="formData.projectId"
          multiple
          :action="uploadUrl"
          :data="uploadData"
          :format="['jpg', 'jpeg', 'png', 'gif', 'svg']"
          :on-progress="onProgress"
          :on-success="onSuccess"
          :on-error="onError"
        >
          <div class="upload-area">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽图片到区域内进行上传</p>
          </div>
        </Upload>
      </FormItem>
    </Form>

    <ButtonGroup slot="footer">
      <Button
        v-show="fileAmount"
        :disabled="uploadAmount < fileAmount"
        size="large"
        type="primary"
        @click="handleCancel"
      >
        完成
      </Button>
    </ButtonGroup>
  </Modal>
</template>

<script>
  export default {
    components: {},
    props: {
      status: String,
      data: Object,
      projectList: Array
    },
    data () {
      return {
        visible: false,
        loading: true,
        formData: {},
        uploadUrl: `${process.env.API_HOST}/index.php?_m=source_upload`,
        uploadData: {},
        fileAmount: 0,
        uploadAmount: 0
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
      handleCancel () {
        this.visible = false
      },
      show () {
        this.visible = true
      },
      hide () {
        this.visible = false
      },
      onClose (val) {
        this.fileAmount = 0
        this.uploadAmount = 0
        !val && this.$emit('on-close')
      },
      onChange () {
        this.uploadData = {
          token: this.$store.state.user.token,
          proj_id: this.formData.projectId
        }
      },
      onProgress (event, file, fileList) {
        this.fileAmount = fileList.length
      },
      onSuccess (res) {
        this.uploadAmount += 1
      },
      onError () {
        this.uploadAmount += 1
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-area {
    padding: 20px;
    text-align: center;
    border: 1px #ddd dotted;
    border-radius: 8px;
  }
</style>