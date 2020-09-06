export default [{
    path: "/",
    name: "首页",
    meta: {title: "首页"},
    component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue')
}]
// () => import(/* webpackChunkName: "about" */ '../views/About.vue')
