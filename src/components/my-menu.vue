<template>
  <Menu
    mode="horizontal"
    theme="light"
    :active-name="activeName"
    class="my-menu"
    @on-select="menuItemSelect"
  >
    <MenuItem name="boorowbooks">
      <Icon type="ios-construct" />借书管理
    </MenuItem>
    <MenuItem name="returnbooks">
      <Icon type="ios-construct" />还书管理
    </MenuItem>
    <MenuItem name="books">
      <Icon type="ios-construct" />图书管理
    </MenuItem>
    <MenuItem name="readers">
      <Icon type="ios-construct" />读者管理
    </MenuItem>
    <Submenu name="5">
      <template slot="title">
        <Icon type="ios-stats" />系统管理
      </template>
      <MenuItem name="user">用户管理</MenuItem>
      <MenuItem name="role">角色管理</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
import { log } from 'util'
export default {
  data() {
    return {
      activeName: 'boorowbooks'
    }
  },
  methods: {
    menuItemSelect(name) {
      this.$router.push('/home/' + name)
    }
  }
}
</script>
<style scoped>
.my-menu {
  height: 50px;
}
</style>