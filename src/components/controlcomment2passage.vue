<template>
  <div>
    <ul>
      <li class="item" v-for="(item, index) in passagelist" :key="index">
        <router-link
          :to="{
            name: 'controlcomment2Details',
            params: { passageID: item.id },
          }"
        >
          <a> {{ item.title }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "controlcomment2passage",
  data() {
    return {
      passagelist: [],
      contentid: [],
    };
  },
  created() {
    this.getpassage();
  },
  methods: {
    getpassage() {
      this.$axios({
        url:
          "http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=100",
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
  },
};
</script>
<style scoped>
</style>