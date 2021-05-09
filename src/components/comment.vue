<template>
  <!-- 前台大厅留言控制 -->
  <div>
    <div>
      <el-input
        type="textarea"
        :rows="2"
        maxlength="30"
        placeholder="请输入内容"
        v-model="textarea"
        style="margin-left: 200px; width: 350px"
      >
      </el-input>
    </div>
    <div style="margin-left: 200px">
      <el-button @click="sent">发表评论</el-button>
      <el-table :data="list" style="width: 100%" height="800px">
        <el-table-column fixed prop="content" label="内容" width="400">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="400">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  created: function () {
    this.getcomment();
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