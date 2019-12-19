<template>
  <Container>
    <Header>
      <Button @click="handleAdd">
        <Icon type="md-add" />
        添加
      </Button>
    </Header>

    <Content>
      <Table :columns="columns" :data="list" :loading="loading" />
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
  </Container>
</template>

<script>
  import Services from '@services'
  import Container from '@components/Container'
  import Header from '@components/Header'
  import Content from '@components/Content'
  import Footer from '@components/Footer'

  export default {
    components: {
      Container,
      Header,
      Content,
      Footer
    },
    data () {
      const columns = [
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
          key: 'sex'
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
              }, '修改')
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
        total: 0
      }
    },
    created () {
      this.getProjectList()
    },
    methods: {
      /**
       * 添加项目
       */
      handleAdd () {},
      /**
       * 修改项目
       */
      handleEdit () {},
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
            dep,
            create_time: createTime,
            update_time: updateTime
          } = item

          arr.push({
            id,
            no,
            name,
            sex,
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
