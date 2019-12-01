import { queryPage, saveReaders, update, delRole } from '@/api/readers/index'
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
          title: '读者名称',
          key: 'readerName',
          align: 'center'
        },
        {
          title: '读者性别',
          key: 'readerSex',
          align: 'center'
        },
        {
          title: '读者信用值',
          key: 'readerPrestige',
          align: 'center'
        },
        {
          title: '读者借书次数',
          key: 'readerNumber',
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
        readerName: [
          { required: true, message: '请输入读者名称', trigger: 'blur' }
        ],
        readerAge: [
          { required: true, message: '请输入读者年龄', trigger: 'blur' }
        ],
        readerSex: [
          { required: true, message: '请输入读者性别', trigger: 'blur' }
        ],
        readerId: [
          { required: true, message: '请输入读者身份证号', trigger: 'blur' }
        ],
        readerPrestige: [
          { required: true, message: '请输入读者信用值', trigger: 'blur' }
        ],
        readerNumber: [
          { required: true, message: '请输入读者借书次数', trigger: 'blur' }
        ],
        deposit: [
          { required: true, message: '请输入押金', trigger: 'blur' }
        ],
        readerAdderss: [
          { required: true, message: '请输入读者地址', trigger: 'blur' }
        ]
      },
      tableForm: {}
    }
  },
  props: {
    choiceVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.getPage(this.page)
  },
  methods: {
    // 查询读者列表
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
    // 添加读者弹出窗触发
    add () {
      this.tableForm = {}
      this.modelTitle = '添加读者'
      this.modelVisible = true
    },
    // 执行添加用读者接口
    save (data) {
      this.formLoading = true
      saveReaders(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('添加读者成功!');
        } else {
          this.$Message.error('添加读者失败!');
        }
        this.formLoading = false
      })
    },
    // 查看读者详情
    getDetails (row) {
      this.tableForm = JSON.parse(JSON.stringify(row))
      this.modelVisible = true
      this.modelTitle = '读者查看'
    },
    // 编辑读者
    edit (row) {
      this.modelVisible = true
      this.modelTitle = '读者编辑'
      this.tableForm = JSON.parse(JSON.stringify(row))
    },
    update (data) {
      this.formLoading = true
      update(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('修改读者成功!');
        } else {
          this.$Message.error('修改读者失败!');
        }
        this.formLoading = false
      })
    },

    // 提交校验
    validate () {
      var _this = this
      this.$refs['tableFormInline'].validate(function (valid) {
        if (valid) {
          // 添加读者
          _this.formLoading = true
          Object.assign(_this.tableForm)
          if (_this.modelTitle === '添加读者') {
            _this.save(_this.tableForm)
          } else {
            _this.update(_this.tableForm)
          }
        } else {
          _this.$Message.error('校验未通过!');
        }
      })
    },
    // 删除读者
    del (index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除该读者吗？</p>',
        onOk: () => {
          delRole(this.tableData[index]).then(res => {
            if (res.data.data) {
              this.getPage(Object.assign(this.page, { current: 1 }))
              this.$Message.success('删除读者成功!');
            } else {
              this.$Message.error('删除读者失败!');
            }
          })
        }
      })
    },
    // 选择
    choice (row) {
      this.$emit("choice", row)
    }
  }
}