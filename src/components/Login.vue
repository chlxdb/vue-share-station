<template>
  <!-- 管理员登录 -->
  <div class="login-container">
    <div class="login-box">
      <p style="margin-left: 10%; margin-top: 5%; font-size: 20px">
        管理员登录处<router-link to="/based"
          ><span style="margin-left: 150px">回到首页</span></router-link
        >
      </p>
      <!--登录表单区域-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login-form"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!--按钮区-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button
            type="info"
            @click="resetLoginForm"
            style="margin-right: 15px"
            >重置</el-button
          >
          <el-checkbox v-model="checked" @change="checkbox"
            >记住密码</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      //登录表单的数据对象

      checked: false,
      loginForm: {
        username: "",
        password: "",
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (localStorage.getItem("status") != "false") {
      this.checked = true;
      this.loginForm.username = localStorage.getItem("name");
      this.loginForm.password = localStorage.getItem("password");
    } else {
      this.checked = false;
    }
  },
  methods: {
    checkbox() {
      if (this.checked != false) {
        window.localStorage.setItem("name", this.loginForm.username);
        window.localStorage.setItem("password", this.loginForm.password);
      }
    },
    //点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        if (this.checked != false) {
          this.$axios({
            url: "http://121.4.187.232:8080/user/adminLogin",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
              username: localStorage.getItem("name"),
              password: localStorage.getItem("password"),
            },
          }).then((res) => {
            if (res.data.state === true) {
              window.localStorage.setItem("status", this.checked);
              window.localStorage.setItem("token", res.data.token);
              this.$router.push("/manager"); //登录验证成功路由实现跳转
              this.$notify({
                title: "提示",
                message: "管理员登录成功",
                duration: 3000,
              });
            } else {
              this.$notify({
                title: "提示",
                message: "管理员登录失败",
                duration: 3000,
              });
            }
          });
        } else {
          this.$axios({
            url: "http://121.4.187.232:8080/user/adminLogin",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password,
            },
          }).then((res) => {
            if (res.data.state === true) {
              window.localStorage.setItem("status", this.checked);
              window.sessionStorage.setItem("token", res.data.token);
              this.$router.push("/manager"); //登录验证成功路由实现跳转
              this.$notify({
                title: "提示",
                message: "管理员登录成功",
                duration: 3000,
              });
            } else {
              this.$notify({
                title: "提示",
                message: "管理员登录失败",
                duration: 3000,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #333;
  height: 100%;
}
.login-box {
  width: 30%;
  height: 40%;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 35%;
  right: 50%;
  top: 180px;
}

.avater-box {
  width: 130px;
  height: 130px;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 35%;
  top: -100px;
  background-color: #fff;
}
.avater-box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flexjusti;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>