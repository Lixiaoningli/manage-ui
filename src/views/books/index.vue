<template>
  <div id="books">
    <Switch v-model="tableLoading"></Switch>
    <div class="flex-div">
      <div class="row-col" v-for="item in tableData">
        <img :src="item.frontImageUrl"/>
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
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>