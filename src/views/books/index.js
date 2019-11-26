import { getPage,saveBooks,update,delBooks } from '@/api/books/index'
export default {
    data() {
        return {
            modelTitle: '',
            modelVisible: false,
            tableLoading: false,
            formLoading: false,
            tableParams: {},
            tableLoading: false,
            page: {
                current: 1,
                size: 5,
                total: 0
            },
            tabsActive: 'list',
            tableData: [],
            tableCol: [
                {
                  type: 'index',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '图书',
                  key: 'bookName',
                  align: 'center',
                  render: (h,row) => {
                    console.log(row)
                    return h('img',{style: { width: '100px'},attrs: {src: row.row.frontImageUrl}})
                  }
                },
                {
                  title: '书籍名称',
                  key: 'bookName',
                  align: 'center'
                },
                {
                  title: '书籍作者',
                  key: 'bookAuthor',
                  align: 'center'
                },
                {
                  title: '书籍出版社',
                  key: 'bookPub',
                  align: 'center'
                },
                {
                  title: '书籍是否在书架',
                  key: 'bookNum',
                  align: 'center'
                },
                {
                  title: '书籍分类',
                  key: 'bookSort',
                  align: 'center'
                },
                {
                  title: '操作',
                  slot: 'action',
                  width: 200,
                  align: 'center'
                }
              ],
              tableFormInline: {
                username: [
                  { required: true, message: '请输入图书名', trigger: 'blur' },
                ]
              },
              tableForm: {}
        }
    },
    mounted() {
        this.getList(this.page)
    },
    methods: {
        getList(page) {
            this.tableLoading = true
            getPage(Object.assign(page, this.tableParams)).then(res => {
                this.tableData = res.data.data.records
                this.page.total = res.data.data.total
                this.page.current = res.data.data.current
                this.tableLoading = false
            })
        },
        // 页码变化后执行
        pageChange (current) {
          this.getList(Object.assign(this.page, { current: current }))
        },
        // 页条数发生变化后执行
        pageSizeChange (size) {
          this.getList(Object.assign(this.page, { size: size }))
        },
        getDetails (row) {
            this.tableForm = JSON.parse(JSON.stringify(row))
            this.modelVisible = true
            this.modelTitle = '图书查看'
        },
        edit (row) {
            this.modelVisible = true
            this.modelTitle = '图书编辑'
            this.tableForm = JSON.parse(JSON.stringify(row))
        },
        update (data) {
          this.formLoading = true
          update(data).then(res => {
            if (res.data.data) {
              this.modelVisible = false
              this.getList(Object.assign(this.page, { current: 1 }))
              this.$Message.success('修改图书成功!');
            } else {
              this.$Message.error('修改图书失败!');
            }
            this.formLoading = false
          })
        },
        // 提交校验
        validate () {
          var _this = this
          this.$refs['tableFormInline'].validate(function (valid) {
            if (valid) {
              _this.formLoading = true
              Object.assign(_this.tableForm)
              if (_this.modelTitle === '添加图书') {
                _this.saveBooks(_this.tableForm)
              } else {
                _this.update(_this.tableForm)
              }
            } else {
              _this.$Message.error('校验未通过!');
            }
          })
        },
        del (index) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要删除该图书吗？</p>',
            onOk: () => {
            delBooks(this.tableData[index]).then(res => {
                if (res.data.data) {
                  this.getList(Object.assign(this.page, { current: 1 }))
                  this.$Message.success('删除图书成功!');
                } else {
                  this.$Message.error('删除图书失败!');
                }
              })
            }
          })
        }
    }
}