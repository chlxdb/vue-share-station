<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="string"
      :http-request="xxx"
      :on-preview="handlePreview"
      :on-success="handlesuccess"
      :before-upload="beforeAvatarUploadThree"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-button type="text" @click="dialogVisible = true">创建新文章</el-button>
    <el-dialog title="创建新文章" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input
            type="textarea"
            v-model="form.title"
            maxlength="30"
            show-word-limit
          ></el-input>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              v-model="form.content"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "passagesent",
  data() {
    return {
      dialogVisible: false,
      form: {
        title: "",
        content: "",
      },

      token: "",
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUploadThree(file) {
      let params = new FormData();
      params.append("file", file);
      params.append("passageID", 18);

      this.$axios({
        method: "post",
        url: "http://121.4.187.232:8080/admin/uploadImg",
        data: params,
        headers: {
          "content-type": "multipart/form-data",
          token: this.token,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sent() {
      this.$axios({
        url: "http://121.4.187.232:8080/admin/createPassage",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: this.token,
        },
        params: {
          title: this.form.title,
          content: this.form.content,
        },
      }).then(() => {
        {
          this.dialogVisible = false;
          this.$notify({
            title: "提示",
            message: "创建成功",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>