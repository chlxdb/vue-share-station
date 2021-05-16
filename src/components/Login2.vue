<template>
  <!-- 用户登录 -->
  <div class="login-container">
    <div class="login-box">
      <!--头像区域-->
      <p style="margin-left: 10%; margin-top: 5%; font-size: 20px">
        用户登录或注册区

        <router-link to="/based"
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
          <el-button type="primary" @click="login1">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="warning" @click="login2">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "login2",
  data() {
    return {
      //登录表单的数据对象
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
  methods: {
    //点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },

    login1() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;

        this.$axios({
          url: "http://121.4.187.232:8080/user/userLogin",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            username: this.loginForm.username,
            password: this.loginForm.password,
          },
        }).then((res) => {
          //console.log(res);
          if (res.status === 200) {
            var d = new Date();
            d.setTime(d.getTime() + 1000 * 60 * 60 * 24); //24h
            var expires = "expires=" + d.toGMTString();
            var token2 = "token";
            var path = "path";
            document.cookie =
              token2 +
              "=" +
              res.data.token +
              "; " +
              expires +
              "; " +
              path +
              "/based/contentdetail";
            localStorage.setItem("token2user", res.data.userID);
            localStorage.setItem("username", this.loginForm.username);
            path = sessionStorage.getItem("path");
            // window.sessionStorage.setItem("token2", res.data.token);
            // window.sessionStorage.setItem("token2user", res.data.userID);
            this.$router.push(path); //登录验证成功路由实现跳转
          } else {
            this.$notify({
              title: "提示",
              message: "登录失败",
              duration: 3000,
            });
          }
        });
      });
    },

    login2() {
      this.$refs.loginFormRef
        .validate((valid) => {
          if (!valid) return;

          this.$axios({
            url: "http://121.4.187.232:8080/user/register",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password,
            },
          }).then((res) => {
            let path = sessionStorage.getItem("path");
            alert(path);
            if (res.status == 200) {
              this.$router.push(path); //登录验证成功路由实现跳转
              sessionStorage.setItem("username", this.loginForm.username);
              this.$notify({
                title: "提示",
                message: "注册成功",
                duration: 3000,
              });
            } else {
              this.$notify({
                title: "提示",
                message: "注册失败",
                duration: 3000,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
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
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  position: absolute;
  left: 35%;
  right: 50%;
  top: 30%;
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