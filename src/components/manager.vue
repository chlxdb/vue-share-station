<template>
  <el-container>
    <!--头部区-->
    <el-header>
      <div>
        <img class="pic" src="../assets/6.jpg" alt="" />
        <span>资料分享网站后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章资源发布与管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <router-link to="/manager/passagesent">
                  <el-menu-item index="1-1">发布区</el-menu-item>
                </router-link>
                <router-link to="/manager/resousemanage">
                  <el-menu-item index="1-2">管理区</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link to="/manager/noticemanage">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title"> 公告管理区</span>
              </el-menu-item>
            </router-link>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>评论区管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <router-link to="/manager/controlcomment1">
                  <el-menu-item index="3-1">大厅评论区</el-menu-item>
                </router-link>
                <router-link to="/manager/controlcomment2passage">
                  <el-menu-item index="3-2">文章评论区</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <router-link to="/manager/usermanager">
              <el-menu-item index="4">
                <span slot="title">用户管理区</span>
              </el-menu-item>
            </router-link>
            <router-link to="/manager/datamanage">
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <span slot="title">实时数据区</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "manager",

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped>
.pic {
  width: 30px;
  height: 20px;
  align-items: center;
}
.el-header {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
}

.el-aside {
  background-color: #c3d1e2;
  color: #333;
  text-align: center;
  line-height: 200px;
  z-index: 2;
  position: absolute;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu-vertical-demo {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>