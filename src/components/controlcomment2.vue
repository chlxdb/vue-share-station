<template>
  <!-- 后台文章评论控制 -->
  <div style="margin-left: 200px">
    <div style="margin: 50px">
      文章评论
      <el-button @click="dialogVisible = true">发布新评论</el-button>
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
      <div style="height: 100%" class="scrollbar">
        <el-scrollbar style="height: 100%">
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
        </el-scrollbar>
      </div>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection">取消选择</el-button>
        <el-button @click="remove">删除所选</el-button>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "controlcomment2",
  data() {
    return {
      dialogVisible: false,
      form: {
        content: "",
      },

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
      // console.log(this.list);
    },

    sent() {
      this.$axios({
        url: "http://121.4.187.232:8080/admin/createComment",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: this.token,
        },
        params: {
          content: this.form.content,
          passageID: this.Id,
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
          url: "http://121.4.187.232:8080/admin/deleteComment",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: this.token,
          },
          params: {
            commentID: this.multipleSelection[i].commentID,
          },
        }).then((res) => {
          {
            if (res.status == 200) window.location.reload();
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.el-button {
  background-color: #333;
  color: #ffffff;
}
.el-tabs {
  margin-left: 200px;
  height: 800px;
}
</style>