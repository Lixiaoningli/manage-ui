import { queryPage, saveUser, queryById, update, delUser } from '@/api/login/index.js'
import { english, phone } from '@/regex/index.js'
var md5 = require('md5');
export default {
  data () {
    return {
      modelTitle: '',
      modelVisible: false,
      tableLoading: false,
      formLoading: false,
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
          title: '上次登录IP',
          key: 'ip',
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
            validator: (rule, value, callback) => {
              if (value !== this.tableForm.password) {
                return callback(new Error('两次输入不相同'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        holder: [
          { required: true, message: '请输入账号持有人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phone, trigger: 'blur' }
        ]
      },
      tableForm: {}
    }
  },
  mounted () {
    this.getPage(this.page)
  },
  methods: {
    // 查询用户列表
    getPage (page) {
      this.tableLoading = true
      queryPage(Object.assign(page, this.tableParams)).then(res => {
        this.tableData = res.data.data.records
        this.page.total = res.data.data.total
        this.page.current = res.data.data.current
        this.tableLoading = false
      })
    },
    // 页码变化后执行
    pageChange (current) {
      this.getPage(Object.assign(this.page, { current: current }))
    },
    // 页条数发生变化后执行
    pageSizeChange (size) {
      this.getPage(Object.assign(this.page, { size: size }))
    },
    // 添加用户弹出窗触发
    add () {
      this.tableForm = {}
      this.modelTitle = '添加用户'
      this.modelVisible = true
    },
    // 执行添加用户接口
    save (data) {
      this.formLoading = true
      saveUser(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('添加用户成功!');
        } else {
          this.$Message.error('添加用户失败!');
        }
        this.formLoading = false
      })
    },
    // 查看用户详情
    getDetails (index) {
      var id = this.tableData[index].id
      this.getById(id)
      this.modelVisible = true
      this.modelTitle = '用户查看'
    },
    getById (id) {
      queryById(id).then(res => {
        this.tableForm = res.data.data
        this.tableForm.againPassword = res.data.data.password
      })
    },
    // 编辑用户
    edit (index) {
      alert("此功能存在BUG")
      /**
       * 当查询出来的密码是MD5加密后，如果在进行保存将会再次加密，导致密码错乱
       */
      this.modelVisible = true
      this.modelTitle = '用户编辑'
      this.getById(this.tableData[index].id)
    },
    update (data) {
      this.formLoading = true
      update(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('修改用户成功!');
        } else {
          this.$Message.error('修改用户失败!');
        }
        this.formLoading = false
      })
    },

    // 提交校验
    validate () {
      var _this = this
      this.$refs['tableFormInline'].validate(function (valid) {
        if (valid) {
          // 添加用户
          _this.formLoading = true
          // var password = md5(_this.tableForm.password)
          // password = md5(password + 'booksmanage')
          // var againPassword = md5(_this.tableForm.againPassword)
          // againPassword = md5(againPassword + 'booksmanage')
          Object.assign(_this.tableForm)
          if (_this.modelTitle === '添加用户') {
            _this.save(_this.tableForm)
          } else {
            _this.update(_this.tableForm)
          }
        } else {
          _this.$Message.error('校验未通过!');
        }
      })
    },
    // 删除用户
    del (index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除该用户吗？</p>',
        onOk: () => {
          delUser(this.tableData[index]).then(res => {
            if (res.data.data) {
              this.getPage(Object.assign(this.page, { current: 1 }))
              this.$Message.success('删除用户成功!');
            } else {
              this.$Message.error('删除用户失败!');
            }
          })
        }
      })

    }
  }
}