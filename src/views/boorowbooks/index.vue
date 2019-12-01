<template>
  <div id="returnbooks">
    <Card>
      <Button
        type="primary"
        class="m-b-10"
        @click="boorow"
        v-if="!choiceVisible"
      >借书</Button>
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
          <Button
            type="primary"
            style="margin-right: 5px"
            @click="choice(row)"
            v-if="choiceVisible"
          >选择</Button>
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
    <!-- form内弹出窗 -->
    <Modal
      v-model="formMdelVisible"
      :mask-closable="false"
      :title="booksVisible?'图书列表':'读者列表'"
      width="80%"
    >
      <!-- 图书列表 -->
      <books
        v-if="booksVisible"
        :choiceVisible="true"
        @choice="bookChoice"
      ></books>
      <!-- 读者列表 -->
      <readers
        v-else
        :choiceVisible="true"
        @choice="readerChoice"
      ></readers>

      <template slot="footer">
      </template>
    </Modal>
    <!-- 借书 -->
    <Modal
      v-model="boorowVisible"
      :mask-closable="false"
      title="借书"
    >
      <Form
        ref="tableFormInline"
        :disabled="modelTitle==='借书查看'"
        :model="tableForm"
        :label-width="100"
      >
        <FormItem
          prop="bookName"
          label="借阅图书"
        >
          <div
            @click="booksFocus"
            style="border: 1px solid #dcdee2;height: 24px;border-radius: 3px;line-height: 24px;padding-left: 5px;"
          >
            {{tableForm.bookName}}
          </div>
        </FormItem>
        <FormItem
          prop="readerName"
          label="借书人"
        >
          <div
            @click="readerFocus"
            style="border: 1px solid #dcdee2;height: 24px;border-radius: 3px;line-height: 24px;padding-left: 5px;"
          >
            {{tableForm.readerName}}
          </div>
        </FormItem>
        <FormItem
          prop="expectReturnTime"
          label="预计归还日期"
        >
          <DatePicker
            type="date"
            v-model="tableForm.expectReturnTime"
            format="yyyy-MM-dd"
            placeholder="预计归还日期"
          ></DatePicker>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button
          type="primary"
          @click="boorowVisible = false"
        >取消</Button>
        <Button
          type="primary"
          @click="boorowOk"
        >确定</Button>
      </template>
    </Modal>
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
          <!-- <FormItem
            prop="expectReturnTime"
            label="预计归还日期"
          >
            <Input
              type="text"
              v-model="tableForm.expectReturnTime"
              placeholder="预计归还日期"
            ></Input>
          </FormItem> -->
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