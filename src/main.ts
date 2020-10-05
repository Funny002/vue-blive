import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'

/* 插件 */
import '@/plugin/element-ui'
import '@/assets/theme/index.css'
import axios from '@/plugin/axios'

Vue.config.productionTip = false

/* 挂载原型 */
Vue.prototype.$axios = axios

/* 实例化 */
new Vue({router, store, render: h => h(App)}).$mount('#app')
