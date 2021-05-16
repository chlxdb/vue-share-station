<template>
  <!-- 前台大厅留言控制 -->
  <div style="background-color: rgb(224 230 239)">
    <div>
      <el-input
        type="textarea"
        :rows="2"
        maxlength="30"
        placeholder="请输入内容"
        v-model="textarea"
        style="margin: 50px 0 0 200px; width: 350px"
      >
      </el-input>
      <el-button
        @click="sent"
        style="margin-left: 50px; background-color: #333; color: #ffffff"
        >发表评论</el-button
      >
    </div>

    <div style="margin: 50px 0 0 200px; height: 600px" class="scrollbar">
      <el-scrollbar style="height: 100%">
        <el-table :data="list" style="width: 60%; height: 100%">
          <el-table-column fixed prop="content" label="内容" width="300">
          </el-table-column>
          <el-table-column prop="time" label="时间" width="300">
          </el-table-column> </el-table
      ></el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  created: function () {
    this.getcomment();
    sessionStorage.setItem("path", this.$route.path);
  },
  data() {
    return {
      textarea: "",
      comment: "",

      list: [],
    };
  },

  methods: {
    sent() {
      this.$axios({
        url: "http://121.4.187.232:8080/hallComment/createHallComment",
        method: "post",
        params: {
          content: this.textarea,
        },
      }).then(() => {
        window.location.reload();
        this.textarea = "";
        //  console.log(res);
      });
    },
    getcomment() {
      this.$axios({
        url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",
        method: "get",
      }).then((res) => {
        {
          console.log(res.data);
          // /alert(JSON.stringify(res.data));
          if (this.list == "") {
            for (var i in res.data) {
              this.list.push(res.data[i]);
            }
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 200px;
}
</style>