<template>
  <div style="margin: 0 auto; background-color: ">
    <div slot="header" class="clearfix">
      <div class="wrap">
        <div class="content">
          <p class="sign">欢迎来到</p>
          <p class="sign">我的资料分享站</p>
        </div>
      </div>
    </div>

    <div class="hello" style="margin: 0px 25% 10px 25%">
      <h1 style="font-size: 54px">资料分享站</h1>

      <el-row class="table-grid-content">
        <el-col :span="18" class="grid">
          <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
        </el-col>
        <el-col :span="3" class="grid" :gutter="1">
          <el-button type="success" icon="el-icon-search" @click="tables"
            >搜索</el-button
          >
        </el-col>
      </el-row>

      <div class="item" v-for="(item, index) in list" :key="index">
        <router-link :to="{ name: 'Details', params: { passageID: item.id } }">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span
                ><p class="title">
                  {{ item.title }}超级超级超级多超级超级多超级超
                  级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超级多超级超超级多超级超超级多超级超超级多超级超超级多超级超超级多超级超超级多超级超超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多
                </p></span
              >
            </div>
            <div class="text">
              {{
                item.content
              }}超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级多超级超级多超级超级多超级超级多超级超级多超级超级多
            </div>

            <span style="font-size: 1px">发布于:{{ item.time }}</span>
            <div id="see">
              查看详情

              <el-badge :value="12" :max="10" class="item">
                <el-button size="small" icon="el-icon-chat-dot-round"
                  >评论</el-button
                >
              </el-badge>
            </div>
          </el-card>
        </router-link>
      </div>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 6, 7]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainpage",
  data() {
    return {
      value: "",
      searchData: "",
      list: [],
      input: "",
      id: "",
      total: 10, //数据库中总条数
      pageSize: 5,
      currentPage: 1,
      shopGoods: "",
      show: true,
    };
  },
  created() {
    this.value = sessionStorage.getItem("commenttotal");
    this.getnotice();
    this.checkCookie();
  },
  mounted() {
    this.searchByPage(this.currentPage, this.pageSize);
    // this.checkCookie();
  },

  methods: {
    getnotice() {
      this.$axios({
        url: "http://121.4.187.232:8080/notice/queryNotice",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        // console.log(res);
        this.notice = res.data;
      });
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
        // console.log(res);
        if (this.list !== []) {
          this.list = [];

          this.list = res.data.passageItem;
        } else {
          this.list = res.data.passageItem;
        }
        this.total = res.data.passageItemCount;
        // console.log(this.list);
      });
    },
    checkCookie() {
      var ca = document.cookie;
      if (ca != "") {
        this.$message({
          message: "Welcome you comeback ",
          type: "success",
        });
      }
    },
    // tables() {
    //   var search = this.input;
    //   if (search) {
    //     this.searchData = this.list.filter(function (list) {
    //       console.log(list.title);
    //       return Object.keys(list.title).some(function (key) {
    //         console.log(key);
    //         return String(list.title[key]).toLowerCase().indexOf(search) > -1;
    //       });
    //     });
    //   }
    //},
  },
  // computed: {
  //   tables() {
  //     const input = this.input;
  //     if (input) {
  //       console.log("input输入的搜索内容：" + this.input);
  //       return this.list.filter((data) => {
  //         console.log("object:" + Object.keys(data));
  //         return Object.keys(data).some((key) => {
  //           return String(data[key]).toLowerCase().indexOf(input) > -1;
  //         });

  //       });

  //     }

  //     return this.shopGoods;

  //   },

  //},
};
</script>
<style scoped>
#see:hover {
  font-size: 25px;
}
.el-badge.item {
  margin: 5px;
  margin-left: 310px;
  width: 0px;
  padding: 0px;
}
.el-message {
  min-width: auto;
  font-size: 14px;
  border: 1px solid #ffffff;
  background: #f75050;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  padding: 16px 21px;
}
.title {
  font-family: initial;
  font-size: 32px;
  margin: 0px 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(212, 230, 250);
  border-radius: 20px;
  width: 70%;
  padding: 1%;
  margin: 50px;
}
:hover.item {
  font-size: 20px;
  box-shadow: 0 60px 200px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(115, 191, 253);
}

.text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.wrap {
  height: 300px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  left: 950px;
  width: 300px;
  bottom: 300px;
}
.sign {
  border-radius: 30px;
  margin: 0;
  height: 35px;
  line-height: 30px;
  text-align: center;
  background: rgb(245, 201, 201);
  width: 300px;
  overflow: hidden;
}

@keyframes anim1 {
  0% {
    top: 100px;
    opacity: 1;
  }
  50% {
    top: -100px;
    opacity: 1;
  }
  75% {
    top: -100px;
    opacity: 0;
  }
  100% {
    top: 100px;
    opacity: 0;
  }
}

@keyframes anim2 {
  0% {
    top: -100px;
    opacity: 0;
  }
  25% {
    top: 100px;
    opacity: 0;
  }
  50% {
    top: 100px;
    opacity: 1;
  }
  100% {
    top: -100px;
    opacity: 1;
  }
}
.content p:nth-child(1) {
  animation: anim1 4s linear infinite;
}

.content p:nth-child(2) {
  animation: anim2 4s linear infinite;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
<style >
.el-notification {
  width: 350px;
  background-color: rgb(255, 196, 196);
  top: 50%;
}
</style>