<template>
  <Menu mode="horizontal" theme="light" active-name="1" class="my-menu">
    <MenuItem name="1">
      <Icon type="ios-paper" />用户管理
    </MenuItem>
    <MenuItem name="2">
      <Icon type="ios-people" />角色管理
    </MenuItem>
    <MenuItem name="3">
      <Icon type="ios-construct" />读者管理
    </MenuItem>
    <Submenu name="4">
      <template slot="title">
        <Icon type="ios-stats" />图书管理
      </template>
      <MenuGroup title="使用">
        <MenuItem name="3-1">新增和启动</MenuItem>
        <MenuItem name="3-2">活跃分析</MenuItem>
        <MenuItem name="3-3">时段分析</MenuItem>
      </MenuGroup>
      <MenuGroup title="留存">
        <MenuItem name="3-4">用户留存</MenuItem>
        <MenuItem name="3-5">流失用户</MenuItem>
      </MenuGroup>
    </Submenu>
    <MenuItem name="5">
      <Icon type="ios-construct" />借书管理
    </MenuItem>
    <MenuItem name="6">
      <Icon type="ios-construct" />还书管理
    </MenuItem>
  </Menu>
</template>
<style scoped>
.my-menu {
  height: 50px;
}
</style>