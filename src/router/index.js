import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 网站标题
// const webTitle = 'Blive5';

// 实例化路由
const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',
    routes,
})

// 全局守卫
router.beforeResolve((to, from, next) => {
    // document.title = `${to.meta.title} - ${webTitle}`
    next()
})

export default router
