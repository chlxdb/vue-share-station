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
  </div>
</template>
<script>
export default {
  name: "passagesent",
  data() {
    return {
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
    // sent() {
    //   //上传

    //   //添加请求头
    //   var formData = new FormData();
    //   formData.append("file", this.fileList[2].url);
    //   formData.append("passageID", 18);
    //   //添加请求头
    //   let config = {
    //     headers: { "Content-Type": "multipart/form-data", token: this.token },
    //   };
    //   this.$axios
    //     .post("http://121.4.187.232:8080/admin/uploadImg", formData, config)
    //     .then((result) => {
    //       console.log(result);
    //       if (result.data.code == "200") {
    //         //  console.log(result);
    //         this.fid = result.data.data.fid;
    //         //	console.log(e.target.files[0])
    //         this.upImg = result.data.data.url;
    //         //  console.log(this.upImg)
    //         this.idBaiDuOcr1(1);
    //       } else if (result.data.code == "400") {
    //         this.$toast(
    //           "图片超过最大限制10M，上传失败。 参考解决方案： 1： 手工裁剪图片中多余部分   2： 图片发到微信聊天页面， 重新保存到本地，上传保存后的图片"
    //         );
    //       }
    //     });
    // },
  },
};
</script>
<style scoped>
</style>