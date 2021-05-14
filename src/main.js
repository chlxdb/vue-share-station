import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts




import router from './router'
//导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
axios.interceptors.request.use(config => {
  // console.log(config)
  //config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return config
  return config
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')