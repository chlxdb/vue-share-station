<template>
  <div>
    <div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
        style="width: 60%"
        :rows="5"
      >
      </el-input>
    </div>
    <div style="margin-left: 200px">
      <el-button @click="getcomment">获取所有评论 </el-button>
      <el-table :data="list" style="width: 100%" height="800px">
        <el-table-column fixed prop="content" label="内容" width="400">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="400">
        </el-table-column>
        <el-table-column prop="id" label="序号" width="400"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {
      textarea: "",
      list: [],
    };
  },
  methods: {
    getcomment() {
      this.$axios({
        url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",
        method: "get",
      }).then((res) => {
        {
          // console.log(res.data);
          // /alert(JSON.stringify(res.data));
          if (this.list == "") {
            for (var i in res.data) {
              this.list.push(res.data[i]);
            }
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 200px;
}
</style>