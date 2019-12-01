<template>
  <div id="books">
    <Button
      type="primary"
      class="m-b-10"
      @click="add"
    >添加图书</Button>
    <Tabs
      v-model="tabsActive"
      class="tabs-books"
    >
      <TabPane
        label="列表"
        icon="ios-list-box-outline"
        name="list"
      >
        <Table
          stripe
          :columns="tableCol"
          border
          :data="tableData"
          v-if="tabsActive === 'list'"
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
              @click="edit(row)"
            >编辑</Button>
            <Button
              type="error"
              @click="del(index)"
            >删除</Button>
          </template>
          <Switch v-model="tableLoading"></Switch>
        </Table>
      </TabPane>
      <TabPane
        label="视图"
        icon="ios-photos-outline"
        name="view"
      >
        <div
          class="flex-div"
          v-if="tabsActive === 'view'"
        >
          <div
            class="row-col"
            v-for="(item,index) in tableData"
            :key="`${index}view`"
          >
            <img :src="item.frontImageUrl" />
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
    <Modal
      v-model="modelVisible"
      :mask-closable="false"
      :title="modelTitle"
    >
      <Form
        ref="tableFormInline"
        :disabled="modelTitle==='图书查看'"
        :model="tableForm"
        :rules="tableFormInline"
        :label-width="80"
        inline
        :key="formKey"
      >
        <Row>
          <Col span="12">
          <FormItem
            prop="bookName"
            label="书籍名称"
          >
            <Input
              type="text"
              v-model="tableForm.bookName"
              placeholder="书籍名称"
            ></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            prop="bookAuthor"
            label="书籍作者"
          >
            <Input
              type="text"
              v-model="tableForm.bookAuthor"
              placeholder="书籍作者"
            ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem
            prop="bookPub"
            label="书籍出版社"
          >
            <Input
              type="text"
              v-model="tableForm.bookPub"
              placeholder="书籍出版社"
            ></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            prop="bookSort"
            label="书籍分类"
          >
            <Select
              v-model="tableForm.bookSort"
              placeholder="书籍分类"
            >
              <Option
                v-for="item in booksType"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem
            prop="frontImageUrl"
            lable="正面封面"
            label="正面封面"
          >
            <Upload
              multiple
              type="drag"
              action="/fileUpload/upload"
              :on-success="frontSuccess"
              v-if="!tableForm.frontImageUrl"
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-image-outline"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p>请选择图片</p>
              </div>
            </Upload>
            <!-- 设置图片回显 -->
            <img
              v-else
              :src="tableForm.frontImageUrl"
              class="book-image"
            />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            prop="afterImageUrl"
            lable="背面封面"
            label="背面封面"
          >
            <Upload
              multiple
              type="drag"
              action="/fileUpload/upload"
              :on-success="afterSuccess"
              v-if="!tableForm.afterImageUrl"
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-image-outline"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p>请选择图片</p>
              </div>
            </Upload>
            <!-- 设置图片回显 -->
            <img
              v-else
              :src="tableForm.afterImageUrl"
              class="book-image"
            />
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
          <FormItem
            prop="bookNum"
            label="是否在书架"
          >
            <Select
              v-model="tableForm.bookNum"
              placeholder="书籍是否在书架"
            >
              <Option
                v-for="item in whether"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            prop="readerPrestige"
            v-if="tableForm.bookNum === 1"
            label="所在书架编号"
          >
            <Input
              type="text"
              v-model="tableForm.readerPrestige"
              placeholder="所在书架编号"
            ></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <template slot="footer">
        <Button
          type="primary"
          @click="validate"
          v-if="modelTitle!=='图书查看'"
        >保存</Button>
        <Button
          type="primary"
          @click="modelVisible = false"
        >取消</Button>
      </template>
      <Switch v-model="formLoading"></Switch>
    </Modal>
    <Switch v-model="tableLoading"></Switch>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>