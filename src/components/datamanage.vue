<template>
  <div
    id="myChart"
    :style="{ width: '50%', height: '50%', margin: '0 auto' }"
  ></div>
</template>
<script>
export default {
  name: "datamanage",
  data() {
    return {
      usertotal: "",
      passagetotal: "",
      commenttotal: "",
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.preget();
    this.drawLine();
  },
  methods: {
    preget() {
      this.$axios({
        url: "http://121.4.187.232:8080/admin/queryAllUser",
        method: "post",
        headers: {
          "Content-Type": "application/xdat-www-form-urlencoded",
          token: this.token,
        },
      }).then((res) => {
        let ca = res.data[1].split("：");
        sessionStorage.setItem("usertotal", ca[1]);
      });
      this.$axios({
        url: "http://121.4.187.232:8080/passage/queryAllPassage",
        params: {
          pageNo: 1,
          pageSize: 10000000000,
        },
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        // console.log(res.data.passageItemCount);
        let caa = res.data.passageItemCount;
        sessionStorage.setItem("passagetotal", caa);
      });
      this.$axios({
        url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",
        method: "get",
      }).then((res) => {
        let caaa = res.data.length;
        sessionStorage.setItem("comment", caaa);
        // console.log(res.data.length);
      });
    },
    drawLine() {
      this.usertotal = sessionStorage.getItem("usertotal");
      this.passagetotal = sessionStorage.getItem("passagetotal");
      this.commenttotal = sessionStorage.getItem("comment");
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "网站数据情况" },
        tooltip: {},
        xAxis: {
          data: ["已注用户", "文章资源", "大厅留言", "当日下载"],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {},
        },

        series: [
          {
            name: "总数",
            type: "bar",
            data: [this.usertotal, this.passagetotal, this.commenttotal, "35"],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
</style>