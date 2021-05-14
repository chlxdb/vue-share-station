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

      <el-menu-item index="2">
        <router-link to="/based/comment"
          ><span>留言大厅</span>
        </router-link></el-menu-item
      >
      <el-submenu index="3">
        <template slot="title">登录</template>
        <router-link to="/Login2">
          <el-menu-item index="3-1">用户登录/注册</el-menu-item>
        </router-link>
        <router-link to="/Login">
          <el-menu-item index="3-2">管理员登录</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">个人中心</template>
        <el-menu-item index="4-1">我的收藏</el-menu-item>
        <el-menu-item @click="logout" index="4-2">退出登录</el-menu-item>
      </el-submenu>
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
      var ca = document.cookie;
      // alert(ca);
      // this.token2 = sessionStorage.getItem("token2");
      if (ca != "") {
        localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        alert("已退出");
      } else {
        alert("还未登录");
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