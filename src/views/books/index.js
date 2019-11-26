import { getPage } from '@/api/books/index'
export default {
    data() {
        return {
            tableParams: {},
            tableLoading: false,
            page: {
                current: 1,
                size: 35,
                total: 0
            },
            tableData: []
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
                console.log(this.tableData)
                this.tableLoading = false
            })
        }
    }
}