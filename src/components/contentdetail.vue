<template>
  <div>
    <ul>
      <li class="item" v-for="(item, index) in passagelist" :key="index">
        <strong>{{ item.title }}</strong>
        <p>{{ item.content }}</p>
        <p>{{ item.time }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "contentdetail",
  data() {
    return {
      Id: "",
      passagelist: [],
    };
  },
  mounted() {
    this.Id = this.$route.params.passageID;
    this.getDetail(this.passageID);
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
  },
};
</script>
<style scoped>
</style>