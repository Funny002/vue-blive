import {RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: () => import( '../views/home.vue')
}]

export default routes
