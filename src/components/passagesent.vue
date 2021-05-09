<template>
  <div style="margin-left: 200px">
    <div class="container">
      <div class="col">
        <el-upload
          class="avatar-uploader"
          action="string"
          :on-preview="handlePreview"
          :before-upload="beforeAvatarUploadThree"
          multiple
          :limit="1"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">图片上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
            <p style="color: red">(图片总数不超过5张，用户体验更加！)</p>
            <p></p>
          </div>
        </el-upload>
      </div>
      <div class="col">
        <div style="height: 100%" class="scrollbar">
          <el-scrollbar style="height: 100%">
            <span v-for="(item, index) in picturelist" :key="index">
              <el-image
                :src="'data:image/png;base64,' + item"
                style="width: 70px; hight: 70px; margin: 15px"
                @click="remove1(index)"
              /><i @click="remove1(index)" class="el-icon-delete"></i>
            </span>
          </el-scrollbar>
        </div>
      </div>
      <div class="col">
        <el-upload
          class="upload-demo"
          action="string"
          :on-preview="handlePreview"
          :before-upload="beforedomUploadThree"
          multiple
          :limit="3"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">资源上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">
            只能上传xlsx文件，且不超过10M
          </div> -->
        </el-upload>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "passagesent",
  data() {
    return {
      dialogVisible: false,
      picturelist: [],
      domlist: [],
      Id: "",
      token: "",
    };
  },
  created() {
    this.Id = this.$route.params.passageID;
    this.token = sessionStorage.getItem("token");
    this.getDetail();
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

        this.picturelist = res.data[2];
        this.domlist = res.data[1];
        // console.log(this.domlist);
      });
      // console.log(this.passagelist);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    beforeAvatarUploadThree(file) {
      let params = new FormData();
      params.append("file", file);
      params.append("passageID", this.Id);

      this.$axios({
        method: "post",
        url: "http://121.4.187.232:8080/admin/uploadImg",
        data: params,
        headers: {
          "content-type": "multipart/form-data",
          token: this.token,
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$notify({
            message: "图片成功上传",
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      });
    },
    beforedomUploadThree(file) {
      let domparams = new FormData();
      domparams.append("file", file);
      domparams.append("passageID", this.Id);

      this.$axios({
        method: "post",
        url: "http://121.4.187.232:8080/admin/uploadResources",
        data: domparams,
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
    remove1(index) {
      this.$axios({
        method: "post",
        url: "http://121.4.187.232:8080/admin/deleteImg?imgID=" + index,

        headers: {
          "content-type": "multipart/form-data",
          token: this.token,
        },
      }).then((res) => {
        if (res.status == "200") {
          this.$notify({
            message: "图片删除成功",
          });
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        }
      });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.col {
  flex: 1 0 40%;
  text-align: center;
  background: rgb(212, 230, 250);
  margin: 10px;
  padding: 10px 0px;
  color: #000;
}
i:hover {
  box-shadow: 0 0 2px 2px;
  font-size: 20px;
}
</style>