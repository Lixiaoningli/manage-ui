<template>
  <div id="user">
    <Card>
      <Button type="primary" class="m-b-10">添加用户</Button>
      <Table stripe :columns="tableCol" border :data="tableData">
        <template slot="action" slot-scope="{row,index}">
          <Button type="primary" style="margin-right: 5px">查看</Button>
          <Button type="primary" style="margin-right: 5px">编辑</Button>
          <Button type="error">删除</Button>
        </template>
        <Switch v-model="tableLoading"></Switch>
      </Table>
      <Page
        class-name="page"
        :page-size="page.size"
        :total.sync="page.total"
        show-sizer
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </Card>
    <!-- 查看、编写详情框 -->
    <Modal v-model="modelVisible" title="Common Modal dialog box title">
      <Form ref="tableFormInline" :model="tableForm" :rules="tableFormInline" inline>
        <FormItem prop="username">
          <Input type="text" v-model="tableForm.username" placeholder="用户名"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="tableForm.password" placeholder="密码"></Input>
        </FormItem>
        <FormItem prop="againPassword">
          <Input type="password" v-model="tableForm.againPassword" placeholder="确认密码"></Input>
        </FormItem>
        <FormItem prop="holder">
          <Input type="text" v-model="tableForm.holder" placeholder="账号持有者"></Input>
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="tableForm.phone" placeholder="联系电话"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>