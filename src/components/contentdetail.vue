<template>
  <div>
    <div>
      <ul>
        <li class="item" v-for="(item, index) in passagelist" :key="index">
          <strong>{{ item.title }}</strong>
          <p>{{ item.content }}</p>
          <p>{{ item.time }}</p>
        </li>
      </ul>
    </div>
    <div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button @click="sent">发表评论</el-button>
    </div>
    <div>
      <ul>
        <li class="item" v-for="(item, index) in commentlist" :key="index">
          {{ item.content }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "contentdetail",
  data() {
    return {
      token: "",
      tokenuser: "",
      textarea: "",
      Id: "",
      passagelist: [],
      commentlist: [],
    };
  },
  mounted() {
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
        this.passagelist.push(res.data[0]);
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
        for (let i in res.data) this.commentlist.push(res.data[i]);
      });
      //console.log(this.commentlist);
    },
    sent() {
      this.token = sessionStorage.getItem("token2");
      this.tokenuser = sessionStorage.getItem("token2user");
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
        this.textarea = "";
      });
    },
  },
};
</script>
<style scoped>
</style>