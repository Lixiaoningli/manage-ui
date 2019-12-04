import { queryPage, save } from '@/api/boorowbooks/index'
import books from '../books/index.vue'
import readers from '../readers/index.vue'
import { formatTimes } from '@/utils/formattimes'
export default {
  components: {
    books,
    readers
  },
  data () {
    return {
      modelTitle: '',
      modelVisible: false,
      tableLoading: false,
      formMdelVisible: false,
      booksVisible: false,
      formLoading: false,
      boorowVisible: false,
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
          render: (h, row) => {
            return h('img', { style: { width: '100px' }, attrs: { src: row.row.frontImageUrl } })
          }
        },
        {
          title: '借书人',
          key: 'readerName',
          align: 'center'
        },
        {
          title: '借书日期',
          key: 'borrowTime',
          align: 'center'
        },
        {
          title: '预计归还日期',
          key: 'expectReturnTime',
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
    // 查询借书列表
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
    // 查看借书详情
    getDetails (row) {
      this.tableForm = JSON.parse(JSON.stringify(row))
      this.modelVisible = true
      this.modelTitle = '借书查看'
    },
    // 借书
    boorow () {
      this.tableForm = {}
      this.boorowVisible = true
    },
    // 借阅图书获取焦点
    booksFocus () {
      this.formMdelVisible = true
      this.booksVisible = true
    },
    // 借阅人获取焦点
    readerFocus () {
      this.formMdelVisible = true
      this.booksVisible = false
    },
    bookChoice (row) {
      this.tableForm.bookName = row.bookName
      this.tableForm.bookId = row.id
      this.formMdelVisible = false
    },
    readerChoice (row) {
      this.tableForm.readerName = row.readerName
      this.tableForm.readersId = row.id
      this.formMdelVisible = false
    },
    // 借书点击确定
    boorowOk () {
      this.tableForm.expectReturnTime = formatTimes(
        this.tableForm.expectReturnTime,
        'yyyy-MM-dd'
      )
      save(JSON.stringify({
        readersId: this.tableForm.readersId,
        bookId: this.tableForm.bookId,
        expectReturnTime: this.tableForm.expectReturnTime
      })).then(res => {
        if (res.data.data) {
          this.boorowVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('借书成功!');
        } else {
          this.$Message.error('借书失败!');
        }
      })
    },
    // 选择
    choice (row) {
      this.$emit("choice", row)
    }
  }
}