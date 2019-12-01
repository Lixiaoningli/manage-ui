<template>
  <Menu
    mode="horizontal"
    theme="light"
    :active-name="activeName"
    class="my-menu"
    @on-select="menuItemSelect"
  >
    <!-- <MenuItem name="/main">
    <Icon type="ios-construct" />首页
    </MenuItem> -->
    <MenuItem name="boorowbooks">
    <Icon type="ios-book" />借书管理
    </MenuItem>
    <MenuItem name="returnbooks">
    <Icon type="ios-book" />还书管理
    </MenuItem>
    <MenuItem name="books">
    <Icon type="ios-book" />图书管理
    </MenuItem>
    <MenuItem name="readers">
    <Icon type="ios-contacts" />读者管理
    </MenuItem>
    <Submenu name="5">
      <template slot="title">
        <Icon type="ios-construct" />系统管理
      </template>
      <MenuItem name="user">用户管理</MenuItem>
      <MenuItem name="role">角色管理</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
import { log } from 'util'
import { mapGetters } from 'vuex'
export default {
  mounted () { },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ activeName: 'activeName' })
  },
  methods: {
    menuItemSelect (name) {
      sessionStorage.setItem('activeName', name)
      this.$router.push(name)
    }
  }
}
</script>
<style scoped>
.my-menu {
  height: 50px;
}
</style>