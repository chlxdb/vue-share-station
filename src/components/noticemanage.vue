<template>
  <!-- 公告控制 -->
  <div style="margin: 200px">
    <div>
      <el-input
        type="textarea"
        :rows="3"
        width:50px
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button @click="sent">发布新公告</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "noticemanage",
  data() {
    return {
      textarea: "",
      token: "",
    };
  },
  created() {
    if (
      sessionStorage.getItem("token") != "" &&
      sessionStorage.getItem("token") != null
    ) {
      this.token = sessionStorage.getItem("token");
    } else {
      this.token = localStorage.getItem("token");
    }
  },
  methods: {
    sent() {
      this.token = sessionStorage.getItem("token");
      this.$axios({
        url: "http://121.4.187.232:8080/admin/updateNotice",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: this.token,
        },
        params: {
          content: this.textarea,
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$notify({
            title: "提示",
            message: "公布成功",
            duration: 3000,
          });
          this.textarea = "";
        }
      });
    },
  },
  updated() {},
};
</script>
<style scoped>
.el-button {
  background-color: #333;
  color: #ffffff;
}
</style>