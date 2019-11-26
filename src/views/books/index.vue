<template>
  <div id="books">
      <Tabs v-model="tabsActive">
          <TabPane label="列表" icon="logo-windows" name="list">
            <Table stripe :columns="tableCol" border :data="tableData" v-if="tabsActive === 'list'">
              <template slot="action" slot-scope="{ row, index }">
          <Button type="primary" style="margin-right: 5px" @click="getDetails(row)">查看</Button>
          <Button type="primary" style="margin-right: 5px" @click="edit(row)">编辑</Button>
          <Button type="error" @click="del(index)">删除</Button>
              </template>
              <Switch v-model="tableLoading"></Switch>
            </Table>
          </TabPane>
           <TabPane label="视图" icon="logo-apple" name="view">
            <div class="flex-div" v-if="tabsActive === 'view'">
              <div class="row-col" v-for="item in tableData">
                <img :src="item.frontImageUrl"/>
                <div class="content">
                  <a>{{item.bookName}}</a>
                  <span>{{item.bookAuthor}}</span>
                  <p>
                    <strong class="color-red">￥36.7</strong>
                    <strong>￥38.00</strong>
                  </p>
                </div>
              </div>
            </div>
          </TabPane>
      </Tabs>
      <div>
        <Page
          class-name="page"
          :page-size="page.size"
          :total.sync="page.total"
          show-total
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
      <!-- 查看、编写详情框 -->
    <Modal v-model="modelVisible" :mask-closable="false" :title="modelTitle">
      <Form
        ref="tableFormInline"
        :disabled="modelTitle==='图书查看'"
        :model="tableForm"
        :rules="tableFormInline"
        inline
      >
        <FormItem prop="username">
          <Input type="text" v-model="tableForm.username" placeholder="用户名"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="tableForm.password" placeholder="密码"></Input>
        </FormItem>
        <FormItem prop="againPassword" v-if="modelTitle!=='图书查看'">
          <Input type="password" v-model="tableForm.againPassword" placeholder="确认密码"></Input>
        </FormItem>
        <FormItem prop="holder">
          <Input type="text" v-model="tableForm.holder" placeholder="账号持有者"></Input>
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="tableForm.phone" placeholder="联系电话"></Input>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button type="primary" @click="validate" v-if="modelTitle!=='图书查看'">保存</Button>
        <Button type="primary" @click="modelVisible = false">取消</Button>
      </template>
      <Switch v-model="formLoading"></Switch>
    </Modal>
    <Switch v-model="tableLoading"></Switch>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>