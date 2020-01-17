<template>
  <Container>
    <Tabs value="name1" type="card">
      <TabPane label="基础表格" name="name1">
        <Table
          :columns="columns"
          :data="list"
        />
      </TabPane>
      <TabPane label="带条纹表格" name="name2">
        <Table
          :columns="columns"
          :data="list"
          stripe
        />
      </TabPane>
      <TabPane label="带边框表格" name="name3">
        <Table
          :columns="columns"
          :data="list"
          border
        />
      </TabPane>
    </Tabs>
  </Container>

</template>

<script>
  import Services from '@services'
  import Container from '@components/Container'

  export default {
    components: {
      Container
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