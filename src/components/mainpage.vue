<template>
  <div>
    <el-container>
      <el-header>资料库</el-header>
    </el-container>

    <div class="index">
      <!-- 跑马灯  -->
      <div>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <img :src="item.idview" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div slot="header" class="clearfix">
      <span>文章区</span>

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
      passagelist: [],
      contentid: [],
      imgList: [
        { id: 0, idview: "../assets/4.jpg" },
        { id: 1, idview: "../assets/5.jpg" },
        { id: 2, idview: "../assets/6.jpg" },
        { id: 3, idview: "../assets/7.jpg" },
      ],
    };
  },
  created: function () {
    this.getpassage();
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
      console.log(this.contentid);
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

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
  position: absolute;
  width: 100%;
  height: 100%;
}
.index {
  background: #c8cfd8;
  width: 80%;
  text-align: center;
  margin-left: 142px;
  width: 80.6%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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

  position: absolute;
  margin-left: 130px;
  width: 80%;
  top: 300px;
  height: 900px;
}
</style>