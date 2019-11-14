import { queryPage } from '@/api/login/index.js'
export default {
  data() {
    return {
      tableCol: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '持有人',
          key: 'holder'
        },
        {
          title: '上次登录时间',
          key: 'loginTime'
        }
      ],
      tableData: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.getPage(this.page)
  },
  methods: {
    // 查询用户列表
    getPage(page, params) {
      queryPage(Object.assign(page, params)).then(res => {
        this.tableData = res.data.data.records
      })
    }
  }
}