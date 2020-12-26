import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// font-awesome v4
import 'font-awesome/css/font-awesome.min.css'

createApp(App).use(store).use(router).mount('#app')
