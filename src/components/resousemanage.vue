<template>
  <div class="hello">
    <h1>element-ui表格</h1>
    <el-row class="table-grid-content">
      <el-col :span="18" class="grid">
        <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="3" class="grid" :gutter="1">
        <el-button type="success" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="2" class="grid" :gutter="15">
        <el-button type="primary" @click="addGoods()">增加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      :stripe="true"
      :border="true"
      width="100%"
      :header-cell-style="{ color: '#000000', fontSize: '20px' }"
    >
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="modifyData(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteData(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 3, 5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "resousemanage",
  data() {
    return {
      centerDialogVisible: false,
      isAddMembers: false,
      isShow: false,
      isAddGoods: false,
      //editForm: [], //修改
      //addForm: [], //新增
      searchData: "",
      list: [],
      input: "",
      id: "",
      total: 13, //数据库中总条数
      pageSize: 3,
      currentPage: 1,
    };
  },

  mounted() {
    this.searchByPage(this.currentPage, this.pageSize);
  },
  methods: {
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
      console.log("editfrom", this.editForm);
      console.log("addfrom", this.addForm);
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
