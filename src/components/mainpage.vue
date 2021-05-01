<template>
  <div>
    <el-container>
      <el-header>资料库</el-header>
    </el-container>
    <!-- <div class="signboard">
      <div class="sign">THANKS</div>
      <div class="strings"></div>
      <div class="pin top"></div>
      <div class="pin left"></div>
      <div class="pin right"></div>
    </div>
    <div class="wrap">
      <div class="content">
        <p>第一条消息</p>
        <p>第二条消息</p>
      </div>
    </div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公告</span>
        <p>{{ notice }}</p>
      </div>
    </el-card>

    <div slot="header" class="clearfix">
      <span>文章区</span>

      <img :src="src" />

      <div class="item" v-for="(item, index) in passagelist" :key="index">
        <router-link :to="{ name: 'Details', params: { passageID: item.id } }">
          <el-link> {{ item.title }}</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainpage",
  data() {
    return {
      src: "",
      passagelist: [],
      contentid: [],
      notice: "",
    };
  },
  created: function () {
    this.getpassage();
    this.getpic();
    this.getnotice();
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
    },
    getpic() {
      this.$axios({
        url: "http://121.4.187.232:8080/passage/passageResources?passageID=18",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(() => {
        // console.log(res);
      });
    },

    getnotice() {
      this.$axios({
        url: "http://121.4.187.232:8080/notice/queryNotice",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        console.log(res.data);
        this.notice = res.data;
      });
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
.text {
  font-size: 14px;
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
  width: 50%;
}
/* html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center 60%, white, sandybrown);
}

.signboard {
  width: 400px;
  height: 300px;
  position: relative;
  animation: swinging 1.5s ease-in-out infinite alternate;
  transform-origin: 200px 13px;
}

.sign {
  width: 100%;
  height: 200px;
  background: burlywood;
  border-radius: 15px;
  position: absolute;
  bottom: 0;
  font-size: 70px;
  color: saddlebrown;
  font-family: serif;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.3), 0 -2px 0 rgba(0, 0, 0, 0.7);
}

.strings {
  width: 150px;
  height: 150px;
  border: 5px solid brown;
  position: absolute;
  border-right: none;
  border-bottom: none;
  transform: rotate(45deg);
  top: 38px;
  left: 122px;
}

.pin {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
}

.pin.top {
  background: gray;
  left: 187px;
}

.pin.left,
.pin.right {
  background: brown;
  top: 110px;
  box-shadow: 0 2px 0 rgba(255, 255, 255, 0.3);
}

.pin.left {
  left: 80px;
}

.pin.right {
  right: 80px;
}

@keyframes swinging {
  from {
    transform: rotate(10deg);
  }

  to {
    transform: rotate(-10deg);
  }
}
.wrap {
  height: 30px;
  overflow: hidden;
  position: absolute;
  top: 30;
  left: 100;
  width: 100%;
}

p {
  margin: 0;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #ccc;
  width: 300px;
}

.content p {
  position: absolute;
}

@keyframes anim1 {
  0% {
    top: 40px;
    opacity: 1;
  }
  50% {
    top: -40px;
    opacity: 1;
  }
  75% {
    top: -40px;
    opacity: 0;
  }
  100% {
    top: 40px;
    opacity: 0;
  }
}

@keyframes anim2 {
  0% {
    top: -40px;
    opacity: 0;
  }
  25% {
    top: 40px;
    opacity: 0;
  }
  50% {
    top: 40px;
    opacity: 1;
  }
  100% {
    top: -40px;
    opacity: 1;
  }
}
.content p:nth-child(1) {
  animation: anim1 5s linear infinite;
}

.content p:nth-child(2) {
  animation: anim2 5s linear infinite;
} */
</style>