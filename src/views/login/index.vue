<template>
  <div
    id="login"
    class="height-full"
  >
    <Card class="card">
      <Form
        ref="formInline"
        :model="formLogin"
        :rules="formInline"
        inline
      >
        <Row
          type="flex"
          justify="center"
        >
          <Col :span="11">
          <FormItem prop="username">
            <Input
              type="text"
              v-model="formLogin.username"
              placeholder="用户名"
            >
            <Icon
              type="ios-person-outline"
              slot="prepend"
            ></Icon>
            </Input>
          </FormItem>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
        >
          <Col :span="11">
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formLogin.password"
              placeholder="密码"
            >
            <Icon
              type="ios-medical-outline"
              slot="prepend"
            ></Icon>
            </Input>
          </FormItem>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
        >
          <Col :span="11">
          <FormItem
            style="width: 100%;"
            class="butFormItem"
          >
            <Button
              style="margin: 0px auto;height: 35px;width: 100px;"
              type="primary"
              @click="loginSubmit('formInline')"
            >登录</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>
