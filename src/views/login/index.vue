<template>
  <div id="login">
    <Card>
      <Form ref="formInline" :model="formLogin" :rules="ruleInline" inline>
        <FormItem prop="username">
          <Input type="text" v-model="formLogin.username" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formLogin.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="loginSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>
