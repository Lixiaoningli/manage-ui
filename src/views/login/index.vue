<template>
  <div id="login">
    <Card>
      <Form ref="formInline" :model="formLogin" :rules="ruleInline" inline>
        <FormItem prop="username">
          <Input type="text" v-model="formLogin.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formLogin.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="loginSubmit('formInline')">Signin</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>
