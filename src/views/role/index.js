import { queryPage, saveRole, queryById, update, delRole } from '@/api/role/index.js'
export default {
  data() {
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
          title: '角色名称',
          key: 'roleName',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'createName',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
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
        size: 10,
        total: 0
      },
      tableParams: {},
      tableFormInline: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      },
      tableForm: {}
    }
  },
  mounted() {
    this.getPage(this.page)
  },
  methods: {
    // 查询角色列表
    getPage(page) {
      this.tableLoading = true
      queryPage(Object.assign(page, this.tableParams)).then(res => {
        this.tableData = res.data.data.records
        this.page.total = res.data.data.total
        this.page.current = res.data.data.current
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
    },
    // 添加角色弹出窗触发
    add() {
      this.tableForm = {}
      this.modelTitle = '添加角色'
      this.modelVisible = true
    },
    // 执行添加角色接口
    save(data) {
      this.formLoading = true
      saveRole(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('添加角色成功!');
        } else {
          this.$Message.error('添加角色失败!');
        }
        this.formLoading = false
      })
    },
    // 查看角色详情
    getDetails(index) {
      var id = this.tableData[index].id
      this.getById(id)
      this.modelVisible = true
      this.modelTitle = '角色查看'
    },
    getById(id) {
      queryById(id).then(res => {
        this.tableForm = res.data.data
        this.tableForm.againPassword = res.data.data.password
      })
    },
    // 编辑角色
    edit(index) {
      this.modelVisible = true
      this.modelTitle = '角色编辑'
      this.getById(this.tableData[index].id)
    },
    update(data) {
      this.formLoading = true
      update(data).then(res => {
        if (res.data.data) {
          this.modelVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('修改角色成功!');
        } else {
          this.$Message.error('修改角色失败!');
        }
        this.formLoading = false
      })
    },

    // 提交校验
    validate() {
      var _this = this
      this.$refs['tableFormInline'].validate(function (valid) {
        if (valid) {
          // 添加角色
          _this.formLoading = true
          if (_this.modelTitle === '添加角色') {
            _this.save(_this.tableForm)
          } else {
            _this.update(_this.tableForm)
          }
        } else {
          _this.$Message.error('校验未通过!');
        }
      })
    },
    // 删除角色
    del(index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除该角色吗？</p>',
        onOk: () => {
          delRole(this.tableData[index]).then(res => {
            if (res.data.data) {
              this.getPage(Object.assign(this.page, { current: 1 }))
              this.$Message.success('删除角色成功!');
            } else {
              this.$Message.error('删除角色失败!');
            }
          })
        }
      })

    }
  }
}