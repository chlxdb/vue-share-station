<template>
  <el-tabs type="border-card">
    <el-tab-pane label="大厅评论">
      <el-button type="text" @click="dialogVisible = true"
        >发布新评论</el-button
      >
      <el-dialog title="发布新评论" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="评论">
            <el-input
              type="textarea"
              v-model="form.content"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sent">确 定</el-button>
        </span>
      </el-dialog>
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="content" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time" label="日期" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="remove()">删除所选</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "controlcomment1",
  data() {
    return {
      dialogVisible: false,
      form: {
        content: "",
      },

      token: "",
      multipleSelection: [],
      list: [],
    };
  },
  created() {
    this.preget();
    this.token = sessionStorage.getItem("token");
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
        url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",
        method: "get",
      }).then((res) => {
        {
          if (this.list == "") {
            for (var i in res.data) {
              this.list.push(res.data[i]);
            }
          }
        }
      });
    },

    sent() {
      this.$axios({
        url: "http://121.4.187.232:8080/hallComment/createHallComment",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          content: this.form.content,
        },
      }).then(() => {
        {
          this.dialogVisible = false;
          window.location.reload();
        }
      });
    },
    remove() {
      for (let i in this.multipleSelection) {
        this.$axios({
          url: "http://121.4.187.232:8080/admin/deleteHallComment",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: this.token,
          },
          params: {
            ID: this.multipleSelection[i].id,
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