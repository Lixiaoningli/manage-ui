<template>
  <div
    id="index"
    class="layout height-full"
  >
    <Layout class="height-full">
      <Header class="header">
        <my-menu></my-menu>
      </Header>
      <Content class="content">
        <!-- vue 路由渲染 -->
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>