import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// element-ui
import '@/PlugIn/element-ui'
// utils 方法自动挂载 $utils.{File}.{function}
import Utils from '@/utils/index'
// font-awesome V4
import FaIcon from "@/PlugIn/FaIcon.vue";
import 'font-awesome/css/font-awesome.min.css'

Vue.component('FaIcon', FaIcon);

Vue.config.productionTip = false;
Vue.prototype.$utils = Utils;

new Vue({router, store, render: h => h(App)}).$mount('#app');
