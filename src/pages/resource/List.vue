<template>
  <Container>
    <Header>
      <Button @click="handleAdd">
        <Icon type="md-add" />
        添加项目
      </Button>
      <Button @click="handleToggleSearchPanel">
        <Icon type="md-search" />
        搜索
      </Button>
    </Header>

    <Content>
      <SearchPanel
        :visible="searchPanelVisible"
        @on-clear="onSearch"
      >
        <Input v-model="projectName" placeholder="项目名" style="width: 200px" />
        <Input v-model="userName" placeholder="用户名" style="width: 200px" />
        <DatePicker type="datetime" :value="startTime" @on-change="onStartTimeChange" placeholder="开始时间"></DatePicker>
        <DatePicker type="datetime" :value="endTime" @on-change="onEndTimeChange" placeholder="结束时间"></DatePicker>
        <Button type="primary">搜索</Button>
      </SearchPanel>
      <Table :columns="columns" :data="resourceList" :loading="loading">
        <template slot-scope="{ row }" slot="action">
          <Button
            class="btn-copy"
            type="default"
            size="small"
            v-clipboard:copy="row.src"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            复制链接
          </Button>
        </template>
      </Table>
    </Content>

    <Footer>
      <Page
        slot="right"
        :total="total"
        :page-size="pageSize"
        size="small"
        show-total
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      />
    </Footer>
  </Container>
</template>

<script>
  import { cloneDeep } from 'lodash'
  import Services from '@services'
  import Container from '@components/Container'
  import Header from '@components/Header'
  import Content from '@components/Content'
  import Footer from '@components/Footer'
  import SearchPanel from '@components/SearchPanel'
  import SourceForm from './components/Form'

  export default {
    components: {
      Container,
      Header,
      Content,
      Footer,
      SearchPanel,
      SourceForm
    },
    data () {
      const columns = [
        {
          title: '项目名',
          key: 'projectName',
          width: 150
        },
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '源文件名',
          key: 'oldFilename'
        },
        {
          title: '链接地址',
          key: 'src',
          render: (h, params) => {
            return h('a',
              {
                domProps: {
                  href: params.row.src,
                  target: 'view_window'
                }
              },
              [
                h('img', {
                  domProps: {
                    className: 'thumb',
                    src: params.row.src
                  }
                })
              ]
            )
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ]
      return {
        searchPanelVisible: false,
        columns: columns,
        projectList: [],
        resourceList: [],
        loading: false,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        projectName: '',
        userName: '',
        startTime: '',
        endTime: '',
        formStatus: 'add',
        formData: {}
      }
    },
    created () {
      this.getProjectList()
      this.getResourceList()
    },
    methods: {
      /**
       * 添加项目
       */
      handleAdd () {
        this.formStatus = 'add'
        this.formData = {}
        this.$refs.sourceForm.show()
      },
      /**
       * 修改项目
       */
      handleEdit (params) {
        this.formStatus = 'edit'
        this.formData = cloneDeep(params.row)
        this.$refs.sourceForm.show()
      },
      handleToggleSearchPanel () {
        this.searchPanelVisible = !this.searchPanelVisible
      },
      /**
       * 搜索
       */
      onSearch () {
        this.getResourceList()
      },
      /**
       * 清空搜索内容
       */
      handleClearSearch () {
        this.projectName = ''
        this.userName = ''
        this.startTime = ''
        this.endTime = ''
        this.getResourceList()
      },
      onStartTimeChange (val) {
        this.startTime = val
      },
      onEndTimeChange (val) {
        this.endTime = val
      },
      /**
       * 换页
       */
      onPageChange (num) {
        this.currentPage = num
        this.getResourceList()
      },
      /**
       * 切换每页条数
       */
      onPageSizeChange (num) {
        this.currentPage = 1
        this.pageSize = num
        this.getResourceList()
      },
      onCopy (e) {
        this.$Message.success('链接复制成功!')
      },
      onError (e) {
        this.$Message.error('链接复制失败！')
      },
      /**
       * 获取表格数据
       */
      async getProjectList () {
        try {
          const res = await Services.getProjectList({
            type: 2,
            page_no: 1,
            page_size: 100
          })
          if (res.ret === 0) {
            this.projectList = this.mappingProjectList(res.data.data_list)
          }
        } catch (err) {
          console.error(err)
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
            proj_name: name
          } = item

          arr.push({
            value: id,
            label: name
          })
        })
        return arr
      },

      /**
       * 获取表格数据
       */
      async getResourceList () {
        this.loading = true
        try {
          const res = await Services.getResourceList({
            page_no: this.currentPage,
            page_size: this.pageSize,
            proj_name: this.projectName,
            account: this.userName,
            start_time: this.startTime,
            end_time: this.endTime
          })
          if (res.ret === 0) {
            this.resourceList = this.mappingResourceList(res.data.data_list)
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
      mappingResourceList (data = []) {
        const arr = []
        data.map(item => {
          const {
            id,
            proj_name: projectName,
            user_name: userName,
            old_filename: oldFilename,
            src,
            create_time: createTime
          } = item

          arr.push({
            id,
            projectName,
            userName,
            oldFilename,
            src,
            createTime
          })
        })
        return arr
      }
    }
  }
</script>

<style lang="less" scoped>
  .btn-copy {
    font-size: 12px;
  }
</style>