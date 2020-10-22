import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建仓库
export default new Vuex.Store({
    state: {
        messageCount: 10,
        nowPage: 1
    }
})