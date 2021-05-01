<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公告</span>
        <p>{{ notice }}</p>
      </div>
    </el-card>

    <el-container>
      <el-header>资料库</el-header>
    </el-container>

    <div class="index">
      <div></div>
    </div>

    <div slot="header" class="clearfix">
      <span>文章区</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-count="totalPage"
        :page-size="10"
        layout="sizes, prev, pager, next"
      >
      </el-pagination>

      <img :src="src" />

      <ul>
        <li class="item" v-for="(item, index) in passagelist" :key="index">
          <router-link
            :to="{ name: 'Details', params: { passageID: item.id } }"
          >
            <a> {{ item.title }}</a>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainpage",
  data() {
    return {
      src: "",
      passagelist: [],
      contentid: [],
      notice: "",
    };
  },
  created: function () {
    this.getpassage();
    this.getpic();
    this.getnotice();
  },
  methods: {
    getpassage() {
      this.$axios({
        url:
          "http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=10",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        for (var i in res.data.passageItem) {
          this.passagelist.push(res.data.passageItem[i]);
          this.contentid.push(res.data.passageItem[i].id);
        }
      });
    },
    getpic() {
      this.$axios({
        url: "http://121.4.187.232:8080/passage/passageResources?passageID=18",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(() => {
        // console.log(res);
      });
    },

    getnotice() {
      this.$axios({
        url: "http://121.4.187.232:8080/notice/queryNotice",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        console.log(res.data);
        this.notice = res.data;
      });
    },
  },
};
</script>
<style scoped>
.el-header {
  height: 100%;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>