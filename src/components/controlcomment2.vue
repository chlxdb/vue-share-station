<template>
  <el-tabs type="border-card">
    <el-tab-pane label="文章评论">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="username" label="用户" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="content" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time" label="日期" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection">取消选择</el-button>
        <el-button @click="remove">删除所选</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "controlcomment2",
  data() {
    return {
      token: "",
      multipleSelection: [],
      list: [],
      Id: "",
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    this.Id = this.$route.params.passageID;
    this.getDetailcomment(this.passageID);
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getDetailcomment() {
      this.$axios({
        url:
          "http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID=" +
          this.Id,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        for (let i in res.data) this.list.push(res.data[i]);
      });
      console.log(this.list);
    },
    remove() {
      for (let i in this.multipleSelection) {
        this.$axios({
          url: "http://121.4.187.232:8080/admin/deleteComment",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: this.token,
          },
          params: {
            commentID: this.multipleSelection[i].commentID,
          },
        }).then(() => {
          {
            window.location.reload();
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.el-tabs {
  margin-left: 200px;
  height: 800px;
}
</style>