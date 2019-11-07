import Vue from 'vue'
import App from './App.vue'
// 引入路由文件
import router from '@/router/index.js'
// 引入Iview 组件 （v: 4.x）
import ViewUI from 'view-design';
import '../my-theme/dist/iview.css';
Vue.use(ViewUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
