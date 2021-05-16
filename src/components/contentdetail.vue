<template>
  <!-- 详情页控制 -->
  <div style="background-color: rgb(224 230 239)">
    <!-- interval可以调节轮播时间 -->
    <el-card>
      <el-carousel :interval="2000" type="card" height="250px">
        <el-carousel-item v-for="(item, index) in picturelist" :key="index">
          <img
            :src="'data:image/png;base64,' + item"
            style="height: 100%; width: 100%"
          />
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <!-- 文章专区 -->
    <div class="container">
      <!-- 评论区 -->
      <div class="col">
        <p><strong>评论区</strong></p>
        <el-input
          type="textarea"
          :rows="3"
          maxlength="30"
          placeholder="写下你的评论吧！"
          v-model="textarea"
          style="width: 300px"
        >
        </el-input>

        <el-button @click="sent">发表评论</el-button>
      </div>
      <div class="col" v-for="(item, index) in passagelist" :key="index">
        <p
          style="margin: 5px 60px 5px 60px; text-align: center; font-size: 32px"
        >
          {{ item.title }}级超多超级多级多级多级
        </p>
        <p
          style="
            text-indent: 2em;
            margin-left: 20px;

            margin-right: 100px;
          "
        >
          {{
            item.content
          }}级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超级超级超级多超级多超级
        </p>

        <p style="font-size: 10px; margin-left: 20px">
          发布于：{{ item.time }}
        </p>
      </div>
      <!-- 资源浏览 -->
      <div class="col">
        <div style="height: 300px" class="scrollbar">
          <el-scrollbar style="height: 100%">
            <div
              v-for="(item, index) in commentlist"
              :key="index"
              style="margin-left: 15px"
            >
              <span
                style="font-family: initial; font-size: 18px margin-left:0px"
              >
                <el-avatar
                  :size="20"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
                {{ item.username }}:

                <p style="font-family: initial; font-size: 16px">
                  {{ item.content }}
                </p>
                <p style="font-family: initial; font-size: 10px">
                  评论于：{{ item.time }}
                </p></span
              >
            </div>
          </el-scrollbar>
        </div>
      </div>
      <!-- 资源下载 -->
      <div class="col">
        <p
          v-for="(item, index) in domlist"
          :key="index"
          style="margin-left: 15px"
        >
          <a style="color: red" @click="load(index)">下载资源</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contentdetail",
  data() {
    return {
      download: "",
      href: "",
      src: "",
      token: "",
      tokenuser: "",
      textarea: "",
      Id: "",
      picture: [],
      passagelist: [],
      commentlist: [],
      domlist: [],
    };
  },
  created() {
    this.Id = this.$route.params.passageID;
    this.getDetail(this.passageID);
    this.getDetailcomment(this.passageID);
    sessionStorage.setItem("path", this.$route.path);
  },
  methods: {
    getDetail() {
      this.$axios({
        url:
          "http://121.4.187.232:8080/passage/passageResources?passageID=" +
          this.Id,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        // console.log(res.data[2]);
        this.passagelist.push(res.data[0]);
        this.picturelist = res.data[2];

        this.commentlist.push(res.data[3]);

        this.domlist = res.data[1];
        // console.log(this.domlist);
      });
      // console.log(this.passagelist);
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
        if (res.status == 200) {
          this.commentlist = res.data;
        }
      });
    },

    sent() {
      var ca = document.cookie.split("=");
      this.token = ca[1];
      this.tokenuser = localStorage.getItem("token2user");
      // alert(ca);
      if (ca != "") {
        this.$axios({
          url:
            "http://121.4.187.232:8080/comment/createComment?content=" +
            this.textarea +
            "&passageID=" +
            this.Id +
            "&userID=" +
            this.tokenuser,
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: this.token,
          },
        }).then((res) => {
          if (res.status == 200) {
            this.$message({
              message: "发表成功",
              type: "success",
            });
          }
        });
      } else {
        this.$message({
          message: "请先登录后再发表评论！",
          type: "warning",
        });
      }
      this.textarea = "";
      // window.location.reload();
    },

    load(index) {
      // alert(item);
      this.$axios({
        url: `http://121.4.187.232:8080/passage/downResources?filePath=${this.domlist[index].address}`,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        responseType: "blob",
      }).then((res) => {
        // console.log(res);
        console.log(res);
        res = res.data;
        let blob = new Blob([res], { type: res.type });
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = this.domlist[index].address;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
        // 下载文件
      });
    },
  },
  updated() {
    this.getDetailcomment();
  },
};
</script>
<style scoped>
.el-button {
  margin-left: 50px;
  background-color: #333;
  color: #ffffff;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
}
.col {
  flex: 1 0 40%;
  /* text-align: center; */
  background: rgb(224 230 239);
  margin: 0;
  padding: 10px 0px;
  color: #000;
}
</style>