<template>
  <div id="user">
    <Card>
      <Table stripe :columns="tableCol" :data="tableData"></Table>
      <Page class-name="page" :total="100" show-sizer />
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>