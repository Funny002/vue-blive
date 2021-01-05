import Vue from 'vue';
import routes from './routes';
import VueRouter from 'vue-router';

const setWebTitle = (webTitle: string | undefined) => {
    const webName = 'Blive5';
    if (webTitle) {
        if (webTitle === '首页') {
            document.title = webName
        } else {
            webTitle && (document.title = webName + ' - ' + webTitle)
        }
    }
}

Vue.use(VueRouter);

const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    setWebTitle(to.meta.title) // 设置标题
    //
    next()
})
export default router
