<template>
  <div id="readers">
    <Card>
      <Button type="primary" class="m-b-10" @click="add">添加读者</Button>
      <Table stripe :columns="tableCol" border :data="tableData">
        <template slot="action" slot-scope="{ row, index }">
          <Button type="primary" style="margin-right: 5px" @click="getDetails(row)">查看</Button>
          <Button type="primary" style="margin-right: 5px" @click="edit(row)">编辑</Button>
          <Button type="error" @click="del(index)">删除</Button>
        </template>
        <Switch v-model="tableLoading"></Switch>
      </Table>
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
    </Card>
    <!-- 查看、编写详情框 -->
    <Modal v-model="modelVisible" :mask-closable="false" :title="modelTitle">
      <Form
        ref="tableFormInline"
        :disabled="modelTitle==='读者查看'"
        :model="tableForm"
        :rules="tableFormInline"
        inline
      >
        <FormItem prop="readerName">
          <Input type="text" v-model="tableForm.readerName" placeholder="读者名称"></Input>
        </FormItem>
        <FormItem prop="readerAge">
          <Input type="text" v-model="tableForm.readerAge" placeholder="读者年龄"></Input>
        </FormItem>
        <FormItem prop="readerSex">
          <Input type="text" v-model="tableForm.readerSex" placeholder="读者性别"></Input>
        </FormItem>
        <FormItem prop="readerId">
          <Input type="text" v-model="tableForm.readerId" placeholder="读者身份证号"></Input>
        </FormItem>
        <FormItem prop="readerPrestige">
          <Input type="text" v-model="tableForm.readerPrestige" placeholder="读者信用值"></Input>
        </FormItem>
        <FormItem prop="readerNumber">
          <Input type="text" v-model="tableForm.readerNumber" placeholder="读者借书次数"></Input>
        </FormItem>
        <FormItem prop="deposit">
          <Input type="text" v-model="tableForm.deposit" placeholder="押金"></Input>
        </FormItem>
        <FormItem prop="readerAdderss">
          <Input type="textarea" v-model="tableForm.readerAdderss" placeholder="读者地址"></Input>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button type="primary" @click="validate" v-if="modelTitle!=='读者查看'">保存</Button>
        <Button type="primary" @click="modelVisible = false">取消</Button>
      </template>
      <Switch v-model="formLoading"></Switch>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>