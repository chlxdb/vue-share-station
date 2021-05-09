<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgb(147, 192, 238)"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="text-decoration: none"
    >
      <el-menu-item index="1"
        ><router-link to="/based/mainpage"
          ><span>主页</span>
        </router-link></el-menu-item
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
        <router-link to="/based/comment"
          ><span>留言大厅</span>
        </router-link></el-menu-item
      >

      <el-menu-item index="4">
        <el-button type="info" @click="logout">退出</el-button>
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
      token2: "",
    };
  },

  methods: {
    logout() {
      this.token2 = sessionStorage.getItem("token2");
      if (this.token2 != "") {
        window.sessionStorage.clear();
        this.$notify("已退出");
      } else {
        this.$notify("还未登录");
      }
    },
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>