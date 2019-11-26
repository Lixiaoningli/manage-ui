<template>
  <div id="returnbooks">
    <Card>
      <Table stripe :columns="tableCol" border :data="tableData">
        <template slot="action" slot-scope="{ row, index }">
          <Button type="primary" style="margin-right: 5px" @click="getDetails(row)">查看</Button>
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
        :disabled="modelTitle==='还书查看'"
        :model="tableForm"
      >
        <!-- <FormItem prop="readerName">
          <Input type="text" v-model="tableForm.readerName" placeholder="还书名称"></Input>
        </FormItem> -->
      </Form>
      <template slot="footer">
        <Button type="primary" @click="modelVisible = false">取消</Button>
      </template>
      <Switch v-model="formLoading"></Switch>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>