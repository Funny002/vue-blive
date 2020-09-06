import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/plugin/element-ui' // 引入组件  && i18n国际化
Vue.config.productionTip = false

new Vue({
    i18n,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
