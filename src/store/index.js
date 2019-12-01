import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null,
    activeName: sessionStorage.getItem("activeName") || 'boorowbooks'
  },
  getters: {
    user: () => sessionStorage.getItem("user"),
    activeName: (state) => state.activeName
  }
})
export default store