<template>
  <el-tabs type="border-card">
    <el-tab-pane label="大厅评论">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="username" label="用户名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="password" label="密码" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="remove()">注销所选用户</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "controlcomment1",
  data() {
    return {
      token: "",
      multipleSelection: [],
      list: [],
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    this.preget();
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
      //  console.log(this.multipleSelection[0].id);
    },
    preget() {
      this.$axios({
        url: "http://121.4.187.232:8080/admin/queryAllUser",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: this.token,
        },
      }).then((res) => {
        {
          for (var i in res.data) {
            this.list.push(res.data[i]);
          }
          console.log(this.list);
        }
      });
    },
    // remove() {
    //  for (let i in this.multipleSelection) {
    //  this.$axios({
    //   url: "http://121.4.187.232:8080/admin/deleteHallComment",
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //    token: this.token,
    //  },
    //  params: {
    //    ID: this.multipleSelection[i].id,
    //   },
    // }).then(() => {
    //  {
    //    window.location.reload();
    //}
    //});
    //}
    //},
  },
};
</script>
<style scoped>
.el-tabs {
  margin-left: 200px;
  height: 800px;
}
</style>