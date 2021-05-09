<template>
  <!-- 详情页控制 -->
  <div>
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
      <div class="col" v-for="(item, index) in passagelist" :key="index">
        <strong
          >{{
            item.title
          }}级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超</strong
        >
        <p>
          {{
            item.content
          }}级超级多超级超级多超级超级多超级超级多超级超级多超级超级多超
        </p>
        <p>发布于：{{ item.time }}</p>
      </div>

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
      <!-- 资源下载 -->
      <div class="col">
        <p v-for="(item, index) in domlist" :key="index">
          <a style="color: red" @click="load(item.address)">下载资源</a>
        </p>
      </div>
      <!-- 资源浏览 -->
      <div class="col">
        <div v-for="(item, index) in commentlist" :key="index">
          <span style="font-family: initial; font-size: 18px margin-left:0px">
            <el-avatar
              :size="20"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            {{ item.username }}:
          </span>
          <span style="font-family: initial; font-size: 18px">{{
            item.content
          }}</span>
          <p style="font-family: initial; font-size: 10px">
            评论于：{{ item.time }}
          </p>
        </div>
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
    this.token = sessionStorage.getItem("token2");
    this.tokenuser = sessionStorage.getItem("token2user");
    this.Id = this.$route.params.passageID;
    this.getDetail(this.passageID);
    this.getDetailcomment(this.passageID);
    // console.log(this.ID);
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
          // console.log(res);
          this.commentlist = res.data;
        }
      });
    },

    sent() {
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
      }).then(() => {
        window.location.reload();
      });
      this.textarea = "";
    },

    load(item) {
      // alert(item);
      this.$axios({
        url: "http://121.4.187.232:8080/passage/downResources?filePath=" + item,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          responseType: "blob",
        },
      }).then((res) => {
        // console.log(res);
        let blob = new Blob([res.data], { type: res.data.type });
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = item.address;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
        // 下载文件
      });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  padding: 30px;
}
.col {
  flex: 1 0 40%;
  text-align: center;
  background: rgb(212, 230, 250);
  margin: 0px;
  padding: 10px 0px;
  color: #000;
}
</style>