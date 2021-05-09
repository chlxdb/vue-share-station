<template>
  <!-- 后台资源管理页 -->
  <div>
    <div style="margin-left: 200px">
      <h1>文章资源发布与管理中心</h1>
      <el-row class="table-grid-content">
        <el-col class="grid">
          <el-input
            v-model="input"
            placeholder="请输入搜索内容"
            style="width: 50%"
          ></el-input>
          <el-button type="success" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col class="grid">
          <el-button @click="dialogVisible = true">创建新文章</el-button>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="content" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time" label="日期" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 获取参数 -->
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'controlcomment2Details',
                params: { passageID: scope.row.id },
              }"
            >
              <el-link> 评论详情</el-link>
            </router-link>
            <router-link
              :to="{
                name: 'passagesent',
                params: { passageID: scope.row.id },
              }"
            >
              <el-link> /资源详情</el-link>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button @click="toggleSelection">取消选择</el-button>
        <el-button @click="remove">删除所选</el-button>
      </div>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="创建新文章" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input
            type="textarea"
            v-model="form.title"
            maxlength="30"
            show-word-limit
          ></el-input>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              v-model="form.content"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "resousemanage",
  data() {
    return {
      dialogVisible: false,
      form: {
        title: "",
        content: "",
      },

      multipleSelection: [],
      centerDialogVisible: false,
      isShow: false,
      //editForm: [], //修改
      //addForm: [], //新增
      searchData: "",
      list: [],
      input: "",
      token: "",
      id: "",
      total: 30, //数据库中总条数
      pageSize: 5,
      currentPage: 1,
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
  },
  mounted() {
    this.searchByPage(this.currentPage, this.pageSize);
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
      console.log(this.multipleSelection);
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      //console.log(this.pageSize); //每页下拉显示数据
      this.searchByPage(this.currentPage, this.pageSize);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页

      this.searchByPage(this.currentPage, this.pageSize);
    },
    //查询
    searchByPage(currentPage, pageSize) {
      this.$axios({
        url: "http://121.4.187.232:8080/passage/queryAllPassage",
        params: {
          pageNo: currentPage,
          pageSize: pageSize,
        },
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        this.total = res.data.passageItemCount;
        if (this.list !== []) {
          this.list = [];
          for (let i in res.data.passageItem)
            this.list.push(res.data.passageItem[i]);
        } else {
          for (let i in res.data.passageItem)
            this.list.push(res.data.passageItem[i]);
        }
      });
    },

    closeDialog() {
      this.centerDialogVisible = false;
      this.isAddMembers = false;
      // console.log("editfrom", this.editForm);
      //console.log("addfrom", this.addForm);
    },

    sent() {
      this.$axios({
        url: "http://121.4.187.232:8080/admin/createPassage",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: this.token,
        },
        params: {
          title: this.form.title,
          content: this.form.content,
        },
      }).then(() => {
        {
          this.dialogVisible = false;
          this.$notify({
            title: "提示",
            message: "创建成功",
          });
        }
      });
    },
    remove() {
      for (let i in this.multipleSelection) {
        this.$axios({
          url: "http://121.4.187.232:8080/admin/deletePassage",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: this.token,
          },
          params: {
            passageID: this.multipleSelection[i].id,
          },
        }).then(() => {
          {
            this.searchByPage(this.currentPage, this.pageSize);
          }
        });
      }
    },
  },
  // computed: {
  //   tables() {
  //     const input = this.input;
  //     if (input) {
  //       console.log("input输入的搜索内容：" + this.input);
  //       return this.shopGoods.filter((data) => {
  //         console.log("object:" + Object.keys(data));
  //         return Object.keys(data).some((key) => {
  //           return String(data[key]).toLowerCase().indexOf(input) > -1;
  //         });
  //       });
  //     }
  //     return this.shopGoods;
  //   },
  // },
};
</script>


<style scoped>
.item {
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(212, 230, 250);
  border-radius: 20px;
  width: 70%;
  padding: 1%;
  margin: 50px;
}
.text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.table-grid-content {
  border-radius: 4px;
  height: 50 px;
  background: #ebeef5;
  padding: 10px;
}

.el-table {
  color: #2c3e50;
  font-size: 15px;
  margin-top: 20px;
}
</style>
