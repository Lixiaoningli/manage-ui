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
          key: 'userName'
        },
        {
          title: '用户角色',
          key: 'roleName'
        },
        {
          title: '持有人',
          key: 'holder'
        },
        {
          title: '上次登录时间',
          key: 'lastDateTime'
        }
      ],
      tableData: [
        {
          userName: 'John Brown',
          roleName: '管理员',
          holder: 'New York No. 1 Lake Park',
          lastDateTime: '2016-10-03 18:25:59'
        },
        {
          userName: 'Jim Green',
          roleName: '管理员',
          holder: 'London No. 1 Lake Park',
          lastDateTime: '2016-10-01 09:31:02'
        },
        {
          userName: 'Joe Black',
          roleName: '管理员',
          holder: 'Sydney No. 1 Lake Park',
          lastDateTime: '2016-10-02 12:25:25'
        },
        {
          userName: 'Jon Snow',
          roleName: '管理员',
          holder: 'Ottawa No. 2 Lake Park',
          lastDateTime: '2016-10-04 12:11:35'
        }
      ]
    }
  }
}