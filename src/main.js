import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './style/app.css'

Vue.config.productionTip = false

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
