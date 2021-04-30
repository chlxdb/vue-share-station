<template>
  <div>
    <div>
      <el-input
        type="textarea"
        :rows="3"
        width:50px
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button @click="sent">发表评论</el-button>
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
      }).then(() => {
        window.location.reload();
        this.textarea = "";
      });
    },
  },
};
</script>
<style scoped>
</style>