<template>
  <Container>
    <!-- Header -->
    <Header>
      <Button type="primary" @click="handleAdd">添加</Button>
      <Button type="error" @click="handleBatchDel">批量删除</Button>
    </Header>

    <!-- Search -->
    <SearchPanel>
      <Input v-model="searchForm.no" type="text" placeholder="工号" style="width: 200px" />
      <Input v-model="searchForm.name" type="text" placeholder="姓名" style="width: 200px" />
      <Select v-model="searchForm.sex" style="width:120px">
        <Option :value="1" :key="1">男</Option>
        <Option :value="2" :key="2">女</Option>
      </Select>
      <Button
        type="primary"
        @click="handleSearch"
      >
        搜索
      </Button>
      <Button
        @click="handleClear"
      >
        清空
      </Button>
    </SearchPanel>

    <!-- Table -->
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      @on-selection-change="onSelect"
      stripe
    />

    <!-- Pager -->
    <Page
      :total="total"
      :page-size="pageSize"
      show-total
      show-elevator
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    />

    <!-- Form -->
    <Modal
      v-model="formVisible"
      :title="`${formStatus === 'add' ? '添加' : '编辑'}用户`"
      :mask-closable="false"
    >
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="80"
      >
        <FormItem
          prop="name"
          label="姓名"
          required
        >
          <Input
            type="text"
            v-model="formItem.name"
          />
        </FormItem>
        <FormItem
          prop="sex"
          label="性别"
          required
        >
          <Select
            v-model="formItem.sex"
            style="width:120px"
          >
            <Option :value="1" :key="1">男</Option>
            <Option :value="2" :key="2">女</Option>
          </Select>
        </FormItem>
        <FormItem
          prop="email"
          label="电子邮箱"
          required
        >
          <Input
            type="text"
            v-model="formItem.email"
          />
        </FormItem>
        <FormItem
          prop="dep"
          label="部门"
          required
        >
          <Input
            type="text"
            v-model="formItem.dep"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
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

  export default {
    components: {
      Container,
      Header,
      Content,
      Footer,
      SearchPanel
    },
    data () {
      const columns = [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '工号',
          key: 'no'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            return h('span',
              {
                domProps: {
                  textContent: params.row.sex === 1 ? '男' : '女'
                }
              }
            )
          }
        },
        {
          title: '电子邮箱',
          key: 'email'
        },
        {
          title: '部门',
          key: 'dep'
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
              }, '编辑')
            ])
          }
        }
      ]
      return {
        columns,
        list: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        selection: [],
        searchForm: {
          no: '',
          name: '',
          sex: 0
        },
        formVisible: false,
        formStatus: '',
        formItem: {}
      }
    },
    created () {
      this.getProjectList()
    },
    methods: {
      handleAdd () {
        this.$refs.formItem.resetFields()
        this.formItem = {}
        this.formStatus = 'add'
        this.formVisible = true
      },
      handleEdit (params) {
        this.formStatus = 'edit'
        this.formItem = cloneDeep(params.row)
        this.formVisible = true
      },
      handleSearch () {},
      handleClear () {
        this.searchForm = {
          no: '',
          name: '',
          sex: 0
        }
      },
      handleSubmit () {
        this.$refs.formItem.validate(valid => {
          if (valid) {
            this.$Message.success('Success!')
            this.formVisible = false
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      handleBatchDel () {
        this.$Modal.confirm({
          title: '批量删除用户',
          content: '是否确认删除改记录？',
          onOk: () => {}
        })
      },
      onSelect (selection) {
        this.selection = selection
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
          const res = await Services.getList({
            page_no: this.currentPage,
            page_size: this.pageSize
          })
          if (res.status === 0) {
            const { list, total } = res.data
            this.list = this.mappingListData(list)
            this.total = total
          }
          this.loading = false
        } catch (err) {
          this.loading = false
        }
      },
      /**
       * 映射返回数据
       * @param {!Object[]} data
       */
      mappingListData (data = []) {
        const arr = []
        data.map(item => {
          const {
            id,
            no,
            name,
            sex,
            email,
            dep,
            create_time: createTime,
            update_time: updateTime
          } = item

          arr.push({
            id,
            no,
            name,
            sex,
            email,
            dep,
            createTime,
            updateTime
          })
        })
        return arr
      }
    }
  }
</script>
