/*
 * @Author: your name
 * @Date: 2020-06-03 15:26:03
 * @LastEditTime: 2020-06-05 09:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \echarts\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
// Echarts
import echarts from "echarts";
Vue.prototype.echarts = echarts;
// Router
import router from "./router/index";
// 引入REM方案
import "lib-flexible/flexible.js";
// 引入Element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入Vuex做登录权限
import store from "./store/index";
Vue.prototype.$store = store;
// 引入Axios工具
import axios from "axios";
import VueAxios from "vue-axios";
// 跨域问题的解决方案

Vue.use(VueAxios, axios);

// 导航守卫
router.beforeEach((to, from, next) => {
  next();
});

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");