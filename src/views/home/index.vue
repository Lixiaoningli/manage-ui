<template>
  <div id="home" class="layout height-full">
    <Layout class="height-full">
      <Header class="header">
        <my-menu></my-menu>
      </Header>
      <Content class="content">
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>