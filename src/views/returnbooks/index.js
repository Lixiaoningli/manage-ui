import { queryPage, save } from '@/api/returnbooks/index'
import boorowbooks from '../boorowbooks/index.vue'
export default {
  components: {
    boorowbooks
  },
  data () {
    return {
      modelTitle: '',
      modelVisible: false,
      returnVisible: false,
      tableLoading: false,
      formMdelVisible: false,
      formLoading: false,
      whether: [
        {
          value: '否',
          label: '否'
        },
        {
          value: '是',
          label: '是'
        }
      ],
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
          title: '还书人姓名',
          key: 'returnName',
          align: 'center'
        },
        {
          title: '借书人姓名',
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
          title: '实际归还日期',
          key: 'returnTime',
          align: 'center'
        },
        {
          title: '是否超期',
          key: 'overdue',
          align: 'center'
        },
        {
          title: '超时扣费',
          key: 'overtimeMoney',
          align: 'center'
        },
        {
          title: '超时天数',
          key: 'overtimeDays',
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
  mounted () {
    this.getPage(this.page)
  },
  methods: {
    // 查询还书列表
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
    // 查看还书详情
    getDetails (row) {
      this.tableForm = JSON.parse(JSON.stringify(row))
      this.modelVisible = true
      this.modelTitle = '还书查看'
    },
    // 还书
    returnBook () {
      this.tableForm = {}
      this.returnVisible = true
    },
    returnOk () {
      save(JSON.stringify({
        bookId: this.tableForm.bookId,
        boorowId: this.tableForm.boorowId,
        borrowTime: this.tableForm.borrowTime,
        overdue: this.tableForm.overdue,
        overtimeDays: this.tableForm.overtimeDays,
        overtimeMoney: this.tableForm.overtimeMoney,
        readersId: this.tableForm.readersId,
        returnName: this.tableForm.returnName
      })).then(res => {
        if (res.data.data) {
          this.returnVisible = false
          this.getPage(Object.assign(this.page, { current: 1 }))
          this.$Message.success('借书成功!');
        } else {
          this.$Message.error('借书失败!');
        }
      })
    },
    boorowFocus () {
      this.formMdelVisible = true
    },
    boorowChoice (row) {
      this.formMdelVisible = false
      this.tableForm.boorowId = row.id
      this.tableForm.bookName = row.bookName
      this.tableForm.bookId = row.bookId
      this.tableForm.readersId = row.readerId
      this.tableForm.borrowTime = row.borrowTime
      this.tableForm.expectReturnTime = row.bookId.expectReturnTime
    }
  }
}