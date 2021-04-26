<template>
  <div>
    <el-container>
      <el-header>资料库</el-header>
    </el-container>
    <el-container>
      <el-main>
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
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "mainpage",
  data() {
    return {
      imgList: [
        { id: 0, idview: "../assets/4.jpg" },
        { id: 1, idview: "../assets/5.jpg" },
        { id: 2, idview: "../assets/6.jpg" },
        { id: 3, idview: "../assets/7.jpg" },
      ],
    };
  },
};
</script>
<style scoped>
.el-header {
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
</style>