<template>
  <Container>
    <Header>
      <Button @click="handleAdd">
        <Icon type="md-add" />
        添加项目
      </Button>
    </Header>

    <Content>
      <Table :columns="columns" :data="projectList" :loading="loading" />
    </Content>

    <Footer>
      <Page
        :total="total"
        :page-size="pageSize"
        size="small"
        show-total
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      />
    </Footer>

    <ProjectForm
      ref="projectForm"
      :status="formStatus"
      :data="formData"
      :departmentList="departmentList"
      @on-saved="init"
    />
  </Container>
</template>

<script>
  import { cloneDeep } from 'lodash'
  import Services from 'services'
  import Container from '@components/Container'
  import Header from '@components/Header'
  import Content from '@components/Content'
  import Footer from '@components/Footer'
  import ProjectForm from './components/Form'

  export default {
    components: {
      Container,
      Header,
      Content,
      Footer,
      ProjectForm
    },
    data () {
      const columns = [
        {
          title: '项目名',
          key: 'name',
          width: 150
        },
        {
          title: '存储空间',
          key: 'bucket'
        },
        {
          title: 'key_id',
          key: 'keyId'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleEdit(params)
                  }
                }
              }, '修改')
            ])
          }
        }
      ]
      return {
        columns,
        departmentList: [],
        projectList: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        formStatus: 'add',
        formData: {}
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getDepartmentList()
        this.getProjectList()
      },
      /**
       * 添加项目
       */
      handleAdd () {
        this.formStatus = 'add'
        this.formData = {}
        this.$refs.projectForm.show()
      },
      /**
       * 修改项目
       */
      handleEdit (params) {
        this.formStatus = 'edit'
        this.formData = cloneDeep(params.row)
        this.$refs.projectForm.show()
      },
      /**
       * 换页
       */
      onPageChange (num) {
        this.currentPage = num
        this.getProjectList()
      },
      /**
       * 切换每页条数
       */
      onPageSizeChange (num) {
        this.currentPage = 1
        this.pageSize = num
        this.getProjectList()
      },
      /**
       * 获取表格数据
       */
      async getProjectList () {
        this.loading = true
        try {
          const res = await Services.getProjectList({
            type: 1,
            page_no: this.currentPage,
            page_size: this.pageSize
          })
          if (res.ret === 0) {
            this.projectList = this.mappingProjectList(res.data.data_list)
            this.total = Number(res.data.total)
          }
          this.loading = false
        } catch (err) {
          console.error(err)
          this.loading = false
        }
      },
      /**
       * 映射返回数据
       * @param {!Object[]} data
       */
      mappingProjectList (data = []) {
        const arr = []
        data.map(item => {
          const {
            proj_id: id,
            proj_name: name,
            department_id: depId,
            domain,
            bucket,
            access_key_id: keyId,
            create_time: createTime,
            update_time: updateTime
          } = item

          arr.push({
            id,
            name,
            depId,
            domain,
            bucket,
            keyId,
            createTime,
            updateTime
          })
        })
        return arr
      },
      /**
       * 获取部门列表
       */
      async getDepartmentList () {
        try {
          const res = await Services.getDepartmentList()
          if (res.ret === 0) {
            this.departmentList = this.mappingDepartmentList(res.data.depart_list)
          }
        } catch (err) {
          console.error(err)
        }
      },
      /**
       * 映射返回数据
       * @param {!Object[]} data
       */
      mappingDepartmentList (data = []) {
        const arr = []
        data.map(item => {
          const { id, name } = item
          arr.push({
            value: id,
            label: name
          })
        })
        return arr
      }
    }
  }
</script>