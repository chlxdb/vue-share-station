<template>
  <div>
    <ul>
      <router-link to="/based/contentdetail">
        <li
          class="item"
          v-for="(item, index) in passagelist"
          :key="index"
          @click="getpassage(item.id)"
        >
          <a> {{ item.title }}</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "contentdetail",
  data() {
    return {};
  },
  methods: {
    getpassagecontent() {
      this.getpassage();
      this.$axios({
        url: "http://121.4.187.232:8080/passage/passageResources",
        method: "get",
        params: {
          passageID: this.list.id,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        for (var i in res.data) {
          this.contentlist.push(res.data[i]);
          console.log(this.contentlist);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>