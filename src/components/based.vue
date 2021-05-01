<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"
        ><router-link to="/based/mainpage">主页 </router-link></el-menu-item
      >

      <el-submenu index="2">
        <template slot="title">登录</template>
        <router-link to="/Login2">
          <el-menu-item index="2-1">用户登录/注册</el-menu-item>
        </router-link>
        <router-link to="/Login">
          <el-menu-item index="2-2">管理员登录</el-menu-item>
        </router-link>
      </el-submenu>

      <el-menu-item index="3">
        <router-link to="/based/comment">留言大厅 </router-link></el-menu-item
      >

      <el-menu-item index="4"
        ><a href="https://www.ele.me">订单管理</a></el-menu-item
      >

      <el-menu-item index="5"
        ><el-button type="info" @click="logout">退出</el-button>
      </el-menu-item>
    </el-menu>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "based",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {},
};
</script>
<style scoped>
</style>