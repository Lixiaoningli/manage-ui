import { queryPage } from '@/api/login/index.js'
import { english } from '@/regex/index.js'
export default {
  data() {
    return {
      modelVisible: false,
      tableLoading: false,
      tableCol: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center'
        },
        {
          title: '持有人',
          key: 'holder',
          align: 'center'
        },
        {
          title: '上次登录时间',
          key: 'loginTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      tableData: [],
      page: {
        current: 1,
        size: 1,
        total: 0
      },
      tableParams: {},
      tableFormInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: english, trigger: 'blur' }

        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        againPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              const reg = /^[\A-\Z\a-\z]+$/
              if (reg.test(value)) {
                callback();
              } else {
                return callback(new Error('只能输入汉字与英文'));
              }
            }, trigger: 'blur'
          }
        ]
      },
      tableForm: {}
    }
  },
  mounted() {
    this.getPage(this.page)
  },
  methods: {
    // 查询用户列表
    getPage(page) {
      this.tableLoading = true
      queryPage(Object.assign(page, this.tableParams)).then(res => {
        this.tableData = res.data.data.records
        this.page.total = res.data.data.total
        this.tableLoading = false
      })
    },
    // 页码变化后执行
    pageChange(current) {
      this.getPage(Object.assign(this.page, { current: current }))
    },
    // 页条数发生变化后执行
    pageSizeChange(size) {
      this.getPage(Object.assign(this.page, { size: size }))
    }
  }
}