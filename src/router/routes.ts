import {RouteConfig} from "vue-router";

export default [{
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue')
}] as Array<RouteConfig>
