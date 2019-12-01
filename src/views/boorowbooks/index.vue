<template>
  <div id="returnbooks">
    <Card>
      <Table
        stripe
        :columns="tableCol"
        border
        :data="tableData"
      >
        <template
          slot="action"
          slot-scope="{ row, index }"
        >
          <Button
            type="primary"
            style="margin-right: 5px"
            @click="getDetails(row)"
          >查看</Button>
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
    <Modal
      v-model="modelVisible"
      :mask-closable="false"
      :title="modelTitle"
    >
      <Form
        ref="tableFormInline"
        :disabled="modelTitle==='借书查看'"
        :model="tableForm"
        :label-width="100"
      >
        <Row>
          <Col span="9">
          <div>
            <img :src="tableForm.frontImageUrl" />
            <span>《{{tableForm.bookName}}》</span>
          </div>
          </Col>
          <Col span="15">
          <FormItem
            prop="readerName"
            label="借书人"
          >
            <Input
              type="text"
              v-model="tableForm.readerName"
              placeholder="借书人"
            ></Input>
          </FormItem>
          <FormItem
            prop="readerSex"
            label="借书人性别"
          >
            <Input
              type="text"
              v-model="tableForm.readerSex"
              placeholder="借书人性别"
            ></Input>
          </FormItem>
          <FormItem
            prop="borrowTime"
            label="借书日期"
          >
            <Input
              type="text"
              v-model="tableForm.borrowTime"
              placeholder="借书日期"
            ></Input>
          </FormItem>
          <FormItem
            prop="expectReturnTime"
            label="预计归还日期"
          >
            <Input
              type="text"
              v-model="tableForm.expectReturnTime"
              placeholder="预计归还日期"
            ></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <template slot="footer">
        <Button
          type="primary"
          @click="modelVisible = false"
        >取消</Button>
      </template>
      <Switch v-model="formLoading"></Switch>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>